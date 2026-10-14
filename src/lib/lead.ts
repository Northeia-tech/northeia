import { z } from "zod";
import { challengeIds } from "@/data/content";
import { isPhone } from "@/lib/crm/phone";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(80, "Use no máximo 80 caracteres."),
  email: z
    .string()
    .trim()
    .max(120, "Use no máximo 120 caracteres.")
    .refine(isEmail, "Informe um e-mail válido."),
  phone: z
    .string()
    .trim()
    .max(30, "Use no máximo 30 caracteres.")
    .refine(isPhone, "Informe um telefone com DDD."),
  company: z
    .string()
    .trim()
    .min(2, "Informe a empresa.")
    .max(120, "Use no máximo 120 caracteres."),
  challenge: z.enum(challengeIds, "Escolha o principal desafio."),
  detail: z.string().trim().max(800, "Use no máximo 800 caracteres."),
  source: z
    .string()
    .trim()
    .regex(/^(site|diagnostico|solucao:[a-z]{2,20})$/, "Origem inválida."),
  website: z.string().max(200),
  startedAt: z.number().int(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const UNCONFIGURED_MESSAGE =
  "O registro no CRM não está ativo. Nenhum lead foi enviado.";

export const SPAM_MESSAGE = "Não foi possível enviar agora. Espere um instante e tente de novo.";

export const RATE_MESSAGE = "Muitos envios a partir desta rede. Tente de novo em alguns minutos.";
