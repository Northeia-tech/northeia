import { i as __toESM } from "../_runtime.mjs";
import { n as site } from "./site-C40jewS1.mjs";
import { s as nav } from "./content-DnRaTIIC.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as Menu, t as X } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog, u as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/frame-ET7Rstte.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var styles = cva("inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40", {
	variants: { variant: {
		primary: "bg-emerald text-emerald-ink hover:bg-paper",
		secondary: "border border-line bg-transparent text-paper hover:border-emerald",
		quiet: "px-0 text-mist hover:text-paper"
	} },
	defaultVariants: { variant: "primary" }
});
function Button({ className, variant, asChild, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(styles({ variant }), className),
		type: asChild ? void 0 : type,
		...props
	});
}
function Logo({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2.5 text-paper", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 32 32",
			className: "size-7",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "16",
					cy: "16",
					r: "9.25",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.75",
					className: "text-mist"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "16",
					cy: "16",
					r: "4.6",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.5",
					className: "text-paper"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "23.6",
					cy: "11.4",
					r: "2.15",
					fill: "currentColor",
					className: "text-emerald"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-xl tracking-tight",
			children: site.name
		})]
	});
}
function Footer() {
	const whatsappReady = site.whatsappE164.replace(/\D/g, "").length >= 10;
	const emailReady = site.email.includes("@");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-line py-14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-sm text-sm text-mist",
						children: "Automação, inteligência de dados e software sob medida para operações que precisam de menos esforço manual e mais clareza."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-mist uppercase",
					children: "Navegação"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2",
					children: [nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						className: "text-sm text-paper hover:text-emerald",
						children: item.label
					}) }, item.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacidade",
						className: "text-sm text-paper hover:text-emerald",
						children: "Política de privacidade"
					}) })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-widest text-mist uppercase",
						children: "Contato"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-2 text-sm text-paper",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#contato",
								className: "hover:text-emerald",
								children: "Pedir um diagnóstico"
							}) }),
							whatsappReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "WhatsApp comercial ativo" }) : null,
							emailReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${site.email}`,
								className: "hover:text-emerald",
								children: site.email
							}) }) : null
						]
					}),
					whatsappReady && emailReady ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-mist",
						children: "WhatsApp, e-mail e redes profissionais entram nesta página quando forem os canais oficiais."
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-line px-5 pt-6 text-xs text-mist sm:flex-row sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"© 2026 ",
				site.name,
				". Marca desta página."
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Demonstrações usam dados fictícios. Não há clientes, métricas ou certificações publicados aqui." })]
		})]
	});
}
function Header() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 border-b border-line bg-ink/90 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#inicio",
					className: "rounded-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Seções",
					className: "hidden items-center gap-5 lg:flex",
					children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						className: "text-sm text-mist transition-colors duration-200 hover:text-paper",
						children: item.label
					}, item.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "hidden sm:inline-flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contato",
							children: "Falar com a Orbe"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
						open,
						onOpenChange: setOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
							className: "inline-flex size-11 items-center justify-center rounded-md border border-line text-paper lg:hidden",
							"aria-label": "Abrir menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
								className: "size-5",
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-ink/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
							className: "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-line bg-ink px-5 py-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
										className: "font-display text-2xl text-paper",
										children: "Navegação"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
										className: "inline-flex size-11 items-center justify-center rounded-md border border-line",
										"aria-label": "Fechar menu",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
											className: "size-5",
											"aria-hidden": "true"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
									className: "sr-only",
									children: "Seções da página"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
									className: "mt-8 flex flex-col",
									"aria-label": "Seções",
									children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: item.href,
										className: "border-t border-line py-4 text-lg text-paper",
										onClick: () => setOpen(false),
										children: item.label
									}, item.href))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "mt-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#contato",
										onClick: () => setOpen(false),
										children: "Falar com a Orbe"
									})
								})
							]
						})] })]
					})]
				})
			]
		})
	});
}
function SiteFrame({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "#conteudo",
			className: "skip-link",
			children: "Pular para o conteúdo"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			id: "conteudo",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
	] });
}
//#endregion
export { SiteFrame as n, cn as r, Button as t };
