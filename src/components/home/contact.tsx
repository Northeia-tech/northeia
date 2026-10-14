import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check, Copy } from "lucide-react";
import { buildBrief, challenges, defaultBrief } from "@/data/content";
import { submitLead } from "@/lib/crm/submit-lead";
import { leadSchema } from "@/lib/lead";
import { useIntent } from "@/lib/intent";
import { mailUrl, whatsappUrl } from "@/lib/site";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  challenge: string;
  detail: string;
  source: string;
  website: string;
};

type Receipt = {
  contactAction: "created" | "updated";
  dealAction: "created" | "updated";
  enteredAt: string;
};

const empty: Fields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  challenge: "",
  detail: "",
  source: "site",
  website: "",
};

const fieldClass =
  "min-h-11 w-full rounded-md border border-line bg-ink px-3 text-sm text-paper outline-none placeholder:text-mist";

const focusId: Record<string, string> = {
  name: "campo-name",
  company: "campo-company",
  email: "campo-email",
  phone: "campo-phone",
  challenge: "campo-desafio",
  detail: "campo-detalhe",
};

function messageFor(fields: Fields) {
  if (fields.name.trim() && fields.company.trim() && fields.email.trim() && fields.phone.trim()) {
    return buildBrief(fields);
  }
  return defaultBrief;
}

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

export function Contact() {
  const intent = useIntent();
  const send = useServerFn(submitLead);
  const [startedAt] = useState(() => Date.now());
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [channelNote, setChannelNote] = useState("");

  useEffect(() => {
    if (intent.nonce === 0) return;
    setFields((current) => ({
      ...current,
      challenge: intent.challenge,
      detail: intent.detail || current.detail,
      source: intent.source || "site",
    }));
    setReceipt(null);
    setFormError("");
    setErrors({});
  }, [intent.nonce, intent.challenge, intent.detail, intent.source]);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function openWhatsapp() {
    const text = messageFor(fields);
    const href = whatsappUrl(text);
    if (!href) {
      setChannelNote(
        "O WhatsApp comercial ainda não está ativo. O diagnóstico, quando o CRM está ligado, segue pelo formulário.",
      );
      document.getElementById("campo-name")?.focus();
      return;
    }
    window.open(href, "_blank", "noopener,noreferrer");
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  }

  const brief = buildBrief(fields);
  const emailHref = mailUrl("Diagnóstico com a Orbe", fields.name.trim() ? brief : defaultBrief);

  return (
    <Section
      id="contato"
      eyebrow="Contato"
      title="O próximo nível da sua operação começa com uma boa pergunta."
      lede="Conte o desafio. O caminho — automação, dados ou software — é desenhado no tamanho do que a empresa precisa agora."
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-sm text-mist">
            O envio grava nome, e-mail, telefone, empresa, desafio e origem no HubSpot, no funil comercial. Se o CRM não estiver ativo, nada é registrado.
          </p>
          <div className="mt-6 flex flex-col items-start gap-3">
            <Button variant="secondary" onClick={openWhatsapp}>
              Iniciar conversa no WhatsApp
            </Button>
            {emailHref ? (
              <a href={emailHref} className="text-sm text-paper underline decoration-line underline-offset-4 hover:decoration-emerald">
                Escrever por e-mail
              </a>
            ) : null}
            <p className="text-sm text-mist" role="status">
              {channelNote ||
                (whatsappUrl(defaultBrief)
                  ? "O WhatsApp abre uma conversa à parte. O lead do formulário vai para o CRM."
                  : "WhatsApp e e-mail comerciais ainda não foram publicados.")}
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          {receipt ? (
            <div className="panel p-6" role="status">
              <p className="flex items-center gap-2 text-sm text-emerald">
                <Check className="size-4" aria-hidden="true" />
                Registrado no CRM
              </p>
              <h3 className="mt-3 text-2xl text-paper">Diagnóstico recebido.</h3>
              <p className="mt-3 text-sm text-paper">
                {receipt.contactAction === "created"
                  ? "Criamos o contato."
                  : "Atualizamos o contato que já existia, sem duplicar."}{" "}
                {receipt.dealAction === "created"
                  ? "Uma oportunidade entrou no funil."
                  : "A oportunidade em aberto foi atualizada."}
              </p>
              <p className="mt-2 text-sm text-mist">Entrada em {formatWhen(receipt.enteredAt)}.</p>
              <pre className="mt-4 overflow-x-auto rounded-md bg-raised p-4 text-sm whitespace-pre-wrap text-paper">{brief}</pre>
              {copyFailed ? (
                <p className="mt-3 text-sm text-paper">Não foi possível copiar automaticamente. Selecione o texto acima.</p>
              ) : null}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => void copy(brief)}>
                  <Copy className="size-4" aria-hidden="true" />
                  {copied ? "Copiado" : "Copiar texto"}
                </Button>
                <Button variant="secondary" onClick={openWhatsapp}>
                  Abrir no WhatsApp
                </Button>
              </div>
              <button
                type="button"
                className="mt-5 text-sm text-mist underline decoration-line underline-offset-4 hover:text-paper"
                onClick={() => {
                  setReceipt(null);
                  setCopied(false);
                }}
              >
                Enviar outro diagnóstico
              </button>
            </div>
          ) : (
            <form
              className="panel relative p-6"
              noValidate
              aria-busy={pending}
              onSubmit={(event) => {
                event.preventDefault();
                if (pending) return;
                const payload = { ...fields, startedAt };
                const parsed = leadSchema.safeParse(payload);
                if (!parsed.success) {
                  const next: Partial<Record<keyof Fields, string>> = {};
                  for (const issue of parsed.error.issues) {
                    const key = issue.path[0];
                    if (typeof key === "string" && !(key in next)) next[key as keyof Fields] = issue.message;
                  }
                  setErrors(next);
                  setFormError("Revise os campos marcados. O lead não foi enviado.");
                  const first = Object.keys(next)[0];
                  if (first) document.getElementById(focusId[first] ?? "")?.focus();
                  return;
                }
                setErrors({});
                setFormError("");
                setPending(true);
                void send({ data: parsed.data })
                  .then((result) => {
                    if (!result.ok) {
                      setFormError(result.message);
                      if (result.fields) {
                        setErrors(result.fields);
                        const first = Object.keys(result.fields)[0];
                        if (first) document.getElementById(focusId[first] ?? "")?.focus();
                      }
                      return;
                    }
                    setReceipt({
                      contactAction: result.contactAction,
                      dealAction: result.dealAction,
                      enteredAt: result.enteredAt,
                    });
                  })
                  .catch(() => {
                    setFormError("Não foi possível falar com o servidor. O lead não foi confirmado.");
                  })
                  .finally(() => setPending(false));
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="campo-name" label="Nome" error={errors.name} value={fields.name} autoComplete="name" onChange={(value) => update("name", value)} />
                <Field id="campo-company" label="Empresa" error={errors.company} value={fields.company} autoComplete="organization" onChange={(value) => update("company", value)} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field id="campo-email" label="E-mail" type="email" inputMode="email" error={errors.email} value={fields.email} autoComplete="email" onChange={(value) => update("email", value)} />
                <Field id="campo-phone" label="Telefone" type="tel" inputMode="tel" error={errors.phone} value={fields.phone} autoComplete="tel" onChange={(value) => update("phone", value)} />
              </div>
              <div className="mt-4">
                <label htmlFor="campo-desafio" className="text-sm text-paper">
                  Principal desafio
                </label>
                <div className="relative mt-2">
                  <select
                    id="campo-desafio"
                    value={fields.challenge}
                    onChange={(event) => update("challenge", event.target.value)}
                    aria-invalid={Boolean(errors.challenge)}
                    aria-describedby={errors.challenge ? "erro-desafio" : undefined}
                    className={cn(fieldClass, "appearance-none pr-10", errors.challenge && "border-paper")}
                  >
                    <option value="">Selecione</option>
                    {challenges.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.challenge ? (
                  <p id="erro-desafio" className="mt-2 text-sm text-paper">
                    Erro — {errors.challenge}
                  </p>
                ) : null}
              </div>
              <div className="mt-4">
                <label htmlFor="campo-detalhe" className="text-sm text-paper">
                  Descreva a necessidade <span className="text-mist">(opcional)</span>
                </label>
                <textarea
                  id="campo-detalhe"
                  value={fields.detail}
                  onChange={(event) => update("detail", event.target.value)}
                  rows={5}
                  maxLength={800}
                  aria-invalid={Boolean(errors.detail)}
                  aria-describedby={errors.detail ? "ajuda-detalhe erro-detalhe" : "ajuda-detalhe"}
                  className={cn(fieldClass, "mt-2 py-3", errors.detail && "border-paper")}
                />
                <p id="ajuda-detalhe" className="mt-2 text-xs text-mist">
                  Até 800 caracteres. {fields.detail.length}/800
                </p>
                {errors.detail ? (
                  <p id="erro-detalhe" className="mt-2 text-sm text-paper">
                    Erro — {errors.detail}
                  </p>
                ) : null}
              </div>
              <div className="absolute top-0 left-0 -z-10 h-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="campo-website">Site</label>
                <input
                  id="campo-website"
                  name="orbe_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={fields.website}
                  onChange={(event) => update("website", event.target.value)}
                />
              </div>
              {formError ? (
                <p className="mt-4 text-sm text-paper" role="alert">
                  {formError}
                </p>
              ) : null}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" disabled={pending}>
                  {pending ? "Registrando…" : "Pedir diagnóstico"}
                </Button>
                <Link to="/privacidade" className="text-sm text-mist underline decoration-line underline-offset-4 hover:text-paper">
                  Política de privacidade
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  value,
  error,
  autoComplete,
  type = "text",
  inputMode,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  autoComplete: string;
  type?: string;
  inputMode?: "email" | "tel" | "text";
  onChange: (value: string) => void;
}) {
  const errorId = `${id}-erro`;
  return (
    <div>
      <label htmlFor={id} className="text-sm text-paper">
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(fieldClass, "mt-2", error && "border-paper")}
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-paper">
          Erro — {error}
        </p>
      ) : null}
    </div>
  );
}
