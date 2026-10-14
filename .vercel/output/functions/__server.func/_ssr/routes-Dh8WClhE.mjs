import { i as __toESM } from "../_runtime.mjs";
import { r as whatsappUrl, t as mailUrl } from "./site-C40jewS1.mjs";
import { a as challenges, c as opsNodes, d as principles, f as recommend, h as steps, i as challengeLabel, l as orderStages, m as solutions, n as buildBrief, o as defaultBrief, p as regionSeries, t as assistantPrompts, u as performanceSeries } from "./content-DnRaTIIC.mjs";
import { i as leadSchema } from "./lead-dtl5Mlsf.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { U as isRedirect, b as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Check, i as Copy, o as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as SiteFrame, r as cn, t as Button } from "./frame-ET7Rstte.mjs";
import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dh8WClhE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var submitLead = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("69539f695a1de482dba8ecbca729007c78ddee918f6703ca8ceee21121291609"));
var useIntent = create((set) => ({
	challenge: "",
	detail: "",
	source: "site",
	nonce: 0,
	setIntent: (challenge, detail = "", source = "site") => set((state) => ({
		challenge,
		detail,
		source,
		nonce: state.nonce + 1
	}))
}));
function Section({ id, eyebrow, title, lede, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		"aria-labelledby": `${id}-titulo`,
		className: "scroll-mt-24 border-t border-line py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-widest text-emerald uppercase",
						children: eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: `${id}-titulo`,
						className: "mt-3 text-3xl text-paper md:text-5xl",
						children: title
					}),
					lede ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-mist",
						children: lede
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12",
				children
			})]
		})
	});
}
var empty = {
	name: "",
	company: "",
	email: "",
	phone: "",
	challenge: "",
	detail: "",
	source: "site",
	website: ""
};
var fieldClass = "min-h-11 w-full rounded-md border border-line bg-ink px-3 text-sm text-paper outline-none placeholder:text-mist";
var focusId = {
	name: "campo-name",
	company: "campo-company",
	email: "campo-email",
	phone: "campo-phone",
	challenge: "campo-desafio",
	detail: "campo-detalhe"
};
function messageFor(fields) {
	if (fields.name.trim() && fields.company.trim() && fields.email.trim() && fields.phone.trim()) return buildBrief(fields);
	return defaultBrief;
}
function formatWhen(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return iso;
	return date.toLocaleString("pt-BR", {
		dateStyle: "short",
		timeStyle: "short"
	});
}
function Contact() {
	const intent = useIntent();
	const send = useServerFn(submitLead);
	const [startedAt] = (0, import_react.useState)(() => Date.now());
	const [fields, setFields] = (0, import_react.useState)(empty);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [formError, setFormError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [receipt, setReceipt] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [copyFailed, setCopyFailed] = (0, import_react.useState)(false);
	const [channelNote, setChannelNote] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (intent.nonce === 0) return;
		setFields((current) => ({
			...current,
			challenge: intent.challenge,
			detail: intent.detail || current.detail,
			source: intent.source || "site"
		}));
		setReceipt(null);
		setFormError("");
		setErrors({});
	}, [
		intent.nonce,
		intent.challenge,
		intent.detail,
		intent.source
	]);
	function update(key, value) {
		setFields((current) => ({
			...current,
			[key]: value
		}));
		setErrors((current) => ({
			...current,
			[key]: void 0
		}));
	}
	function openWhatsapp() {
		const text = messageFor(fields);
		const href = whatsappUrl(text);
		if (!href) {
			setChannelNote("O WhatsApp comercial ainda não está ativo. O diagnóstico, quando o CRM está ligado, segue pelo formulário.");
			document.getElementById("campo-name")?.focus();
			return;
		}
		window.open(href, "_blank", "noopener,noreferrer");
	}
	async function copy(text) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "contato",
		eyebrow: "Contato",
		title: "O próximo nível da sua operação começa com uma boa pergunta.",
		lede: "Conte o desafio. O caminho — automação, dados ou software — é desenhado no tamanho do que a empresa precisa agora.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					children: "O envio grava nome, e-mail, telefone, empresa, desafio e origem no HubSpot, no funil comercial. Se o CRM não estiver ativo, nada é registrado."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col items-start gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: openWhatsapp,
							children: "Iniciar conversa no WhatsApp"
						}),
						emailHref ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: emailHref,
							className: "text-sm text-paper underline decoration-line underline-offset-4 hover:decoration-emerald",
							children: "Escrever por e-mail"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-mist",
							role: "status",
							children: channelNote || (whatsappUrl(defaultBrief) ? "O WhatsApp abre uma conversa à parte. O lead do formulário vai para o CRM." : "WhatsApp e e-mail comerciais ainda não foram publicados.")
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-8",
				children: receipt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-6",
					role: "status",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-sm text-emerald",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "size-4",
								"aria-hidden": "true"
							}), "Registrado no CRM"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 text-2xl text-paper",
							children: "Diagnóstico recebido."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-paper",
							children: [
								receipt.contactAction === "created" ? "Criamos o contato." : "Atualizamos o contato que já existia, sem duplicar.",
								" ",
								receipt.dealAction === "created" ? "Uma oportunidade entrou no funil." : "A oportunidade em aberto foi atualizada."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-mist",
							children: [
								"Entrada em ",
								formatWhen(receipt.enteredAt),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "mt-4 overflow-x-auto rounded-md bg-raised p-4 text-sm whitespace-pre-wrap text-paper",
							children: brief
						}),
						copyFailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-paper",
							children: "Não foi possível copiar automaticamente. Selecione o texto acima."
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => void copy(brief),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									className: "size-4",
									"aria-hidden": "true"
								}), copied ? "Copiado" : "Copiar texto"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								onClick: openWhatsapp,
								children: "Abrir no WhatsApp"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-5 text-sm text-mist underline decoration-line underline-offset-4 hover:text-paper",
							onClick: () => {
								setReceipt(null);
								setCopied(false);
							},
							children: "Enviar outro diagnóstico"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "panel relative p-6",
					noValidate: true,
					"aria-busy": pending,
					onSubmit: (event) => {
						event.preventDefault();
						if (pending) return;
						const payload = {
							...fields,
							startedAt
						};
						const parsed = leadSchema.safeParse(payload);
						if (!parsed.success) {
							const next = {};
							for (const issue of parsed.error.issues) {
								const key = issue.path[0];
								if (typeof key === "string" && !(key in next)) next[key] = issue.message;
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
						send({ data: parsed.data }).then((result) => {
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
								enteredAt: result.enteredAt
							});
						}).catch(() => {
							setFormError("Não foi possível falar com o servidor. O lead não foi confirmado.");
						}).finally(() => setPending(false));
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "campo-name",
								label: "Nome",
								error: errors.name,
								value: fields.name,
								autoComplete: "name",
								onChange: (value) => update("name", value)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "campo-company",
								label: "Empresa",
								error: errors.company,
								value: fields.company,
								autoComplete: "organization",
								onChange: (value) => update("company", value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "campo-email",
								label: "E-mail",
								type: "email",
								inputMode: "email",
								error: errors.email,
								value: fields.email,
								autoComplete: "email",
								onChange: (value) => update("email", value)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "campo-phone",
								label: "Telefone",
								type: "tel",
								inputMode: "tel",
								error: errors.phone,
								value: fields.phone,
								autoComplete: "tel",
								onChange: (value) => update("phone", value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "campo-desafio",
									className: "text-sm text-paper",
									children: "Principal desafio"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "campo-desafio",
										value: fields.challenge,
										onChange: (event) => update("challenge", event.target.value),
										"aria-invalid": Boolean(errors.challenge),
										"aria-describedby": errors.challenge ? "erro-desafio" : void 0,
										className: cn(fieldClass, "appearance-none pr-10", errors.challenge && "border-paper"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Selecione"
										}), challenges.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: item.id,
											children: item.label
										}, item.id))]
									})
								}),
								errors.challenge ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									id: "erro-desafio",
									className: "mt-2 text-sm text-paper",
									children: ["Erro — ", errors.challenge]
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "campo-detalhe",
									className: "text-sm text-paper",
									children: ["Descreva a necessidade ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-mist",
										children: "(opcional)"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: "campo-detalhe",
									value: fields.detail,
									onChange: (event) => update("detail", event.target.value),
									rows: 5,
									maxLength: 800,
									"aria-invalid": Boolean(errors.detail),
									"aria-describedby": errors.detail ? "ajuda-detalhe erro-detalhe" : "ajuda-detalhe",
									className: cn(fieldClass, "mt-2 py-3", errors.detail && "border-paper")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									id: "ajuda-detalhe",
									className: "mt-2 text-xs text-mist",
									children: [
										"Até 800 caracteres. ",
										fields.detail.length,
										"/800"
									]
								}),
								errors.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									id: "erro-detalhe",
									className: "mt-2 text-sm text-paper",
									children: ["Erro — ", errors.detail]
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-0 left-0 -z-10 h-0 overflow-hidden",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "campo-website",
								children: "Site"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "campo-website",
								name: "orbe_hp",
								tabIndex: -1,
								autoComplete: "off",
								value: fields.website,
								onChange: (event) => update("website", event.target.value)
							})]
						}),
						formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-paper",
							role: "alert",
							children: formError
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-3 sm:flex-row sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: pending,
								children: pending ? "Registrando…" : "Pedir diagnóstico"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacidade",
								className: "text-sm text-mist underline decoration-line underline-offset-4 hover:text-paper",
								children: "Política de privacidade"
							})]
						})
					]
				})
			})]
		})
	});
}
function Field({ id, label, value, error, autoComplete, type = "text", inputMode, onChange }) {
	const errorId = `${id}-erro`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: id,
			className: "text-sm text-paper",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			type,
			inputMode,
			value,
			autoComplete,
			onChange: (event) => onChange(event.target.value),
			"aria-invalid": Boolean(error),
			"aria-describedby": error ? errorId : void 0,
			className: cn(fieldClass, "mt-2", error && "border-paper")
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			id: errorId,
			className: "mt-2 text-sm text-paper",
			children: ["Erro — ", error]
		}) : null
	] });
}
function useRecharts() {
	const [lib, setLib] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let live = true;
		import("../_libs/recharts+[...].mjs").then((n) => n.t).then((mod) => {
			if (live) setLib(mod);
		});
		return () => {
			live = false;
		};
	}, []);
	return lib;
}
function ChartFrame({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-56 w-full min-w-0",
		role: "img",
		"aria-label": label,
		children
	});
}
function Tip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-line bg-ink px-3 py-2 text-xs text-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-mist",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "tabular-nums",
			children: payload[0]?.value
		})]
	});
}
function PerformanceChart() {
	const lib = useRecharts();
	if (!lib) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-56 rounded-md bg-raised",
		"aria-hidden": "true"
	});
	const { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } = lib;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
		label: "Gráfico de demonstração: índice semanal fictício da semana 1 à semana 8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data: performanceSeries,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: {
							fill: "var(--color-mist)",
							fontSize: 12
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						hide: true,
						domain: [70, 120]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {}),
						cursor: { stroke: "var(--color-line)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						dataKey: "valor",
						type: "monotone",
						stroke: "var(--color-emerald)",
						fill: "var(--color-emerald)",
						fillOpacity: .16,
						strokeWidth: 2
					})
				]
			})
		})
	});
}
function RegionChart() {
	const lib = useRecharts();
	if (!lib) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-56 rounded-md bg-raised",
		"aria-hidden": "true"
	});
	const { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } = lib;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
		label: "Gráfico de demonstração: percentual no prazo por unidade ilustrativa",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: regionSeries,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: {
							fill: "var(--color-mist)",
							fontSize: 12
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						hide: true,
						domain: [0, 100]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {}),
						cursor: { fill: "var(--color-raised)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "valor",
						fill: "var(--color-emerald)",
						radius: [
							4,
							4,
							0,
							0
						],
						maxBarSize: 48
					})
				]
			})
		})
	});
}
var tabs = [
	{
		id: "painel",
		label: "Desempenho"
	},
	{
		id: "pedidos",
		label: "Pedidos"
	},
	{
		id: "integracao",
		label: "Integração"
	},
	{
		id: "assistente",
		label: "Assistente"
	},
	{
		id: "vendas",
		label: "Vendas"
	}
];
var kpis = [
	["R$ 1,28 mi", "receita do período"],
	["91%", "pedidos no prazo"],
	["14", "exceções abertas"],
	["18 h", "ciclo até faturar"]
];
var units = [
	[
		"Norte",
		"94%",
		"3"
	],
	[
		"Centro",
		"88%",
		"8"
	],
	[
		"Sul",
		"91%",
		"3"
	]
];
function Demos() {
	const [tab, setTab] = (0, import_react.useState)("painel");
	const [step, setStep] = (0, import_react.useState)(0);
	const [synced, setSynced] = (0, import_react.useState)(false);
	const [promptId, setPromptId] = (0, import_react.useState)("prazo");
	const prompt = assistantPrompts.find((item) => item.id === promptId) ?? assistantPrompts[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "demonstracoes",
		eyebrow: "Demonstrações",
		title: "Como uma solução dessas pode parecer.",
		lede: "Interfaces ilustrativas de uma operação imaginária. Nenhum número desta seção é resultado de cliente.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "tablist",
			"aria-label": "Exemplos de aplicação",
			className: "flex gap-2 overflow-x-auto pb-1",
			children: tabs.map((item) => {
				const selected = item.id === tab;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					id: `demo-${item.id}`,
					"aria-selected": selected,
					"aria-controls": "demo-conteudo",
					onClick: () => setTab(item.id),
					className: cn("min-h-11 shrink-0 rounded-md px-4 text-sm transition-colors duration-200", selected ? "bg-emerald text-emerald-ink" : "border border-line text-mist hover:text-paper"),
					children: item.label
				}, item.id);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			id: "demo-conteudo",
			role: "tabpanel",
			"aria-labelledby": `demo-${tab}`,
			className: "panel mt-4 p-5 md:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-mist uppercase",
					children: "Dados fictícios · demonstração"
				}),
				tab === "painel" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-3 text-2xl text-paper",
						children: "Desempenho da operação"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4",
						children: kpis.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-raised px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-mist",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-display text-2xl text-paper tabular-nums",
								children: value
							})]
						}, label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformanceChart, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "mt-4 w-full text-left text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
								className: "mb-2 text-left text-xs text-mist",
								children: "Unidades ilustrativas, não clientes."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-mist",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Unidade"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "No prazo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Exceções"
									})
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: units.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "border-t border-line text-paper",
								children: row.map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 tabular-nums",
									children: cell
								}, cell))
							}, row[0])) })
						]
					})
				] }) : null,
				tab === "pedidos" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl text-paper",
						children: "Fluxo de um pedido"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-md bg-emerald px-4 text-sm font-medium text-emerald-ink hover:bg-paper",
						onClick: () => setStep((current) => current >= orderStages.length - 1 ? 0 : current + 1),
						children: step >= orderStages.length - 1 ? "Reiniciar demonstração" : "Avançar pedido"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-6 space-y-3",
					"aria-live": "polite",
					children: orderStages.map((stage, index) => {
						const state = index < step ? "feito" : index === step ? "agora" : "à frente";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid grid-cols-[auto_1fr] gap-3 border-t border-line pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("mt-0.5 inline-flex size-6 items-center justify-center rounded-full text-xs tabular-nums", index <= step ? "bg-emerald text-emerald-ink" : "bg-raised text-mist"),
								children: index + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-paper",
								children: [stage.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 text-xs text-mist",
									children: state
								})]
							}), index <= step ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-mist",
								children: stage.detail
							}) : null] })]
						}, stage.title);
					})
				})] }) : null,
				tab === "integracao" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl text-paper",
						children: "CRM, financeiro e relatório"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-md bg-emerald px-4 text-sm font-medium text-emerald-ink hover:bg-paper",
						onClick: () => setSynced(true),
						"aria-pressed": synced,
						children: synced ? "Sincronizado na demonstração" : "Sincronizar demonstração"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 grid gap-3 md:grid-cols-3",
					"aria-live": "polite",
					children: [
						[
							"CRM",
							"PED-1042",
							"Origem do pedido"
						],
						[
							"Financeiro",
							synced ? "PED-1042" : "Aguardando",
							synced ? "Título ligado" : "Ainda não refletido"
						],
						[
							"Relatório",
							synced ? "PED-1042" : "Aguardando",
							synced ? "Linha atualizada" : "Fecha manual depois"
						]
					].map(([name, code, status]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-md bg-raised p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest text-mist uppercase",
								children: name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-2xl text-paper",
								children: code
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-mist",
								children: status
							})
						]
					}, name))
				})] }) : null,
				tab === "assistente" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid gap-6 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-2xl text-paper",
							children: "Consulta interna"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-mist",
							children: "Perguntas prontas. As respostas são texto fixo de demonstração, não um modelo ao vivo."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-col gap-2",
							children: assistantPrompts.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": item.id === prompt.id,
								onClick: () => setPromptId(item.id),
								className: cn("min-h-11 rounded-md border px-3 text-left text-sm transition-colors duration-200", item.id === prompt.id ? "border-emerald text-paper" : "border-line text-mist hover:text-paper"),
								children: item.ask
							}, item.id))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-raised p-4",
						"aria-live": "polite",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest text-emerald uppercase",
								children: "Resposta ilustrativa"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-paper",
								children: prompt.answer
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs text-mist",
								children: prompt.source
							})
						]
					})]
				}) : null,
				tab === "vendas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-3 text-2xl text-paper",
						children: "Vendas e operação"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm text-mist",
						children: "Percentual de pedidos no prazo por unidade ilustrativa. Serve para mostrar o tipo de leitura, não um resultado real."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegionChart, {})
					})
				] }) : null
			]
		})]
	});
}
function Finder() {
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [hint, setHint] = (0, import_react.useState)("");
	const matches = recommend(selected);
	function toggle(id) {
		setHint("");
		setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "diagnostico",
		eyebrow: "Encontre oportunidades",
		title: "Marque o que mais pesa hoje.",
		lede: "A sugestão aparece na hora, a partir do que você selecionar. Sem cadastro nesta etapa.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "sr-only",
				children: "Desafios da empresa"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 md:grid-cols-2",
				children: challenges.map((item) => {
					const checked = selected.includes(item.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: cn("flex min-h-11 cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition-colors duration-200", checked ? "border-emerald bg-raised text-paper" : "border-line text-mist hover:border-mist hover:text-paper"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "size-4 accent-emerald",
							checked,
							onChange: () => toggle(item.id)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: item.label
						})]
					}) }, item.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				"aria-live": "polite",
				children: matches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					children: "Nada selecionado ainda. Escolha um ou mais desafios para ver caminhos possíveis."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-3",
					children: matches.map(({ solution, because }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-md border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-paper",
								children: solution.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-mist",
								children: solution.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xs text-emerald",
								children: [
									"Relacionado a ",
									because.map((id) => challengeLabel(id).toLowerCase()).join(", "),
									"."
								]
							})
						]
					}, solution.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: selected.length === 0,
					onClick: () => {
						const first = selected[0];
						if (!first) {
							setHint("Selecione ao menos um desafio.");
							return;
						}
						const labels = selected.map((id) => challengeLabel(id)).join(", ");
						useIntent.getState().setIntent(first, `Desafios marcados: ${labels}. Quero um diagnóstico do que vale atacar primeiro.`, "diagnostico");
						const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
						document.getElementById("contato")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
						window.setTimeout(() => document.getElementById("campo-detalhe")?.focus(), reduce ? 0 : 400);
					},
					children: "Solicitar diagnóstico personalizado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					role: "status",
					children: hint || (selected.length === 0 ? "O botão libera quando houver ao menos um desafio marcado." : `${selected.length} desafio(s) na leitura.`)
				})]
			})
		]
	});
}
function OpsCenter() {
	const [active, setActive] = (0, import_react.useState)("pedidos");
	const node = opsNodes.find((item) => item.id === active) ?? opsNodes[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel rise-late motion-safe:animate-rise p-4 md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm text-paper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "dot size-1.5 rounded-full bg-emerald",
						"aria-hidden": "true"
					}), "Centro de operações"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-mist",
					children: "Demonstração · dados fictícios"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-right text-xs text-mist",
					children: ["4 sistemas", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-paper",
						children: "ligados"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-4 grid grid-cols-3 gap-2",
				children: [
					["64%", "fila automática"],
					["7", "exceções"],
					["18h", "ciclo médio"]
				].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md bg-raised px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-mist",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-display text-xl text-paper tabular-nums",
						children: value
					})]
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "tablist",
					"aria-label": "Processos conectados",
					className: "flex flex-col gap-1",
					children: opsNodes.map((item) => {
						const selected = item.id === node.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							role: "tab",
							id: `op-${item.id}`,
							"aria-selected": selected,
							"aria-controls": "op-painel",
							tabIndex: selected ? 0 : -1,
							onClick: () => setActive(item.id),
							onKeyDown: (event) => {
								const index = opsNodes.findIndex((entry) => entry.id === item.id);
								if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
								event.preventDefault();
								const next = event.key === "ArrowDown" ? opsNodes[(index + 1) % opsNodes.length] : opsNodes[(index - 1 + opsNodes.length) % opsNodes.length];
								setActive(next.id);
								document.getElementById(`op-${next.id}`)?.focus();
							},
							className: cn("flex min-h-11 items-center justify-between rounded-md px-3 text-left text-sm transition-colors duration-200", selected ? "bg-emerald text-emerald-ink" : "text-mist hover:bg-raised hover:text-paper"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("text-xs", selected ? "text-emerald-ink" : "text-mist"),
								children: item.system
							})]
						}, item.id);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "op-painel",
					role: "tabpanel",
					"aria-labelledby": `op-${node.id}`,
					className: "rounded-md bg-raised p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-widest text-emerald uppercase",
							children: node.system
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-4xl text-paper tabular-nums",
							children: node.metric
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-mist",
							children: node.unit
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-paper",
							children: node.note
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex h-16 items-end gap-1",
							"aria-hidden": "true",
							children: node.series.map((value, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 rounded-sm bg-emerald/80",
								style: { height: `${value}%` }
							}, `${node.id}-${index}`))
						})
					]
				})]
			})
		]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "inicio",
		className: "relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hero-grid pointer-events-none absolute inset-0",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-2 lg:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "motion-safe:animate-rise",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-widest text-emerald uppercase",
						children: "Automação · Dados · Software"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-4 text-4xl text-paper sm:text-5xl lg:text-6xl",
						children: [
							"Sua empresa pode ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-emerald",
								children: "operar melhor"
							}),
							".",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 block",
								children: "A tecnologia certa mostra como."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-xl text-base text-mist sm:text-lg",
						children: "Automatizamos processos, conectamos sistemas e transformamos dados dispersos em decisões que a operação consegue executar."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#diagnostico",
								children: ["Descobrir oportunidades de automação", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									className: "size-4",
									"aria-hidden": "true"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#solucoes",
								children: "Conhecer nossas soluções"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-8 flex flex-col gap-2 text-sm text-mist sm:flex-row sm:gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Diagnóstico no tamanho do problema" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Integra com o que já existe" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Conversa direta, sem pacote fechado" })
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpsCenter, {})]
		})]
	});
}
function Method() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "metodo",
		eyebrow: "Como funciona",
		title: "Quatro etapas, do cenário ao que a operação passa a usar.",
		lede: "O desenho acompanha a realidade de cada empresa: time, ferramentas atuais e o tamanho do problema.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "grid gap-px overflow-hidden rounded-lg bg-line md:grid-cols-4",
			children: steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "bg-ink p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-widest text-emerald tabular-nums",
						children: step.n
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 text-2xl text-paper",
						children: step.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-mist",
						children: step.body
					})
				]
			}, step.n))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 max-w-2xl text-sm text-mist",
			children: "Não há um pacote único. Uma integração pequena pode ser o passo certo; um sistema novo só entra se o processo justificar."
		})]
	});
}
function Principles() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "diferenciais",
		eyebrow: "Jeito de trabalhar",
		title: "Tecnologia só entra se mudar a forma de operar.",
		lede: "Resultados de clientes só entram nesta página quando forem reais e puderem ser contados. Até lá, o critério de trabalho é este.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "divide-y divide-line border-y border-line",
			children: principles.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid gap-2 py-6 md:grid-cols-12 md:gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-mist tabular-nums md:col-span-1",
						children: ["0", index + 1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl text-paper md:col-span-4",
						children: item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-mist md:col-span-7",
						children: item.body
					})
				]
			}, item.title))
		})
	});
}
function Problems() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "problemas",
		eyebrow: "O que trava a operação",
		title: "Seis sinais de que a rotina ainda depende de esforço demais.",
		lede: "Cada um abre uma melhoria concreta. Nenhum exige trocar todos os sistemas no primeiro dia.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: challenges.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "grid gap-3 border-t border-line py-6 md:grid-cols-12 md:items-start md:gap-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-mist tabular-nums md:col-span-1",
					children: ["0", index + 1]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-2xl text-paper md:col-span-5",
					children: item.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-widest text-emerald uppercase",
						children: "Oportunidade"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-paper",
						children: item.opportunity
					})]
				})
			]
		}, item.id)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "border-t border-line pt-6 text-sm text-mist",
			children: [
				"Se algum desses descreve a semana da empresa,",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#diagnostico",
					className: "text-paper underline decoration-line underline-offset-4 hover:decoration-emerald",
					children: "marque os desafios e veja por onde começar"
				}),
				"."
			]
		})]
	});
}
function focusDetail() {
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	window.setTimeout(() => document.getElementById("campo-detalhe")?.focus(), reduce ? 0 : 400);
}
function Solutions() {
	const [active, setActive] = (0, import_react.useState)("automacao");
	const current = solutions.find((item) => item.id === active) ?? solutions[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "solucoes",
		eyebrow: "Soluções",
		title: "O que a Orbe faz, na prática.",
		lede: "Cinco frentes. A empresa não precisa de todas. O diagnóstico indica por onde começar.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "tablist",
				"aria-label": "Categorias de solução",
				className: "flex flex-col gap-1 lg:col-span-4",
				children: solutions.map((item, index) => {
					const selected = item.id === current.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "tab",
						id: `sol-${item.id}`,
						"aria-selected": selected,
						"aria-controls": "sol-painel",
						tabIndex: selected ? 0 : -1,
						onClick: () => setActive(item.id),
						onKeyDown: (event) => {
							if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "Home" && event.key !== "End") return;
							event.preventDefault();
							const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? solutions.length - 1 : event.key === "ArrowDown" ? (index + 1) % solutions.length : (index - 1 + solutions.length) % solutions.length;
							const next = solutions[nextIndex];
							setActive(next.id);
							document.getElementById(`sol-${next.id}`)?.focus();
						},
						className: cn("min-h-11 rounded-md px-3 text-left text-sm transition-colors duration-200", selected ? "bg-raised text-paper" : "text-mist hover:bg-raised hover:text-paper"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("mr-2 text-xs tabular-nums", selected ? "text-emerald" : "text-mist"),
							children: ["0", index + 1]
						}), item.name]
					}, item.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: "sol-painel",
				role: "tabpanel",
				"aria-labelledby": `sol-${current.id}`,
				className: "panel p-6 lg:col-span-8 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-3xl text-paper",
						children: current.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-mist",
						children: current.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 space-y-3",
						children: current.examples.map((example) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-t border-line pt-3 text-sm text-paper",
							children: example
						}, example))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contato",
							onClick: () => {
								useIntent.getState().setIntent(current.challenge, current.detail, `solucao:${current.id}`);
								focusDetail();
							},
							children: current.cta
						})
					})
				]
			})]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Problems, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solutions, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Finder, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Method, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Demos, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Principles, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {})
	] });
}
//#endregion
export { Home as component };
