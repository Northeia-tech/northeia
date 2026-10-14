import { n as site } from "./site-C40jewS1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content-DnRaTIIC.js
var nav = [
	{
		href: "#problemas",
		label: "Problemas"
	},
	{
		href: "#solucoes",
		label: "Soluções"
	},
	{
		href: "#diagnostico",
		label: "Diagnóstico"
	},
	{
		href: "#metodo",
		label: "Método"
	},
	{
		href: "#demonstracoes",
		label: "Demonstrações"
	},
	{
		href: "#contato",
		label: "Contato"
	}
];
var challengeIds = [
	"manual",
	"espalhado",
	"relatorios",
	"visibilidade",
	"sistemas",
	"decisao"
];
var challenges = [
	{
		id: "manual",
		label: "Excesso de trabalho manual",
		title: "Processos repetitivos consomem horas",
		opportunity: "O que já tem regra sai da fila. A pessoa entra quando o caso foge do combinado."
	},
	{
		id: "espalhado",
		label: "Informações espalhadas",
		title: "A informação vive em vários lugares",
		opportunity: "Planilha, sistema e mensagem passam a contar a mesma história — sem copiar e colar."
	},
	{
		id: "relatorios",
		label: "Demora para gerar relatórios",
		title: "O relatório atrasa a decisão",
		opportunity: "O fechamento nasce do processo, no horário da reunião, e não na véspera."
	},
	{
		id: "visibilidade",
		label: "Falta de indicadores",
		title: "Indicadores importantes ficam invisíveis",
		opportunity: "Cada área vê o número que usa para agir, com a origem do dado à vista."
	},
	{
		id: "sistemas",
		label: "Sistemas desconectados",
		title: "Os sistemas não se falam",
		opportunity: "Pedido, financeiro e CRM trocam o que importa, sem um projeto que troque tudo."
	},
	{
		id: "decisao",
		label: "Decisões sem dados confiáveis",
		title: "A decisão sai sem dado confiável",
		opportunity: "O contexto chega antes da escolha — atualizado, e não de memória."
	}
];
var solutions = [
	{
		id: "automacao",
		name: "Automação empresarial",
		summary: "Tira da rotina o que já tem regra: tarefa, aprovação, documento e a ponte entre os sistemas que a empresa já usa.",
		examples: [
			"Um pedido aprovado segue para o próximo sistema sem alguém redigitar.",
			"O relatório semanal sai no mesmo formato, no horário combinado.",
			"Aprovação por valor ou alçada anda sozinha; a exceção para numa pessoa.",
			"CRM, ERP e a planilha que ainda importa trocam o dado uma vez."
		],
		cta: "Mapear um processo para automatizar",
		challenge: "manual",
		detail: "Quero mapear um processo repetitivo e ver o que dá para automatizar sem trocar os sistemas de uma vez."
	},
	{
		id: "bi",
		name: "Business intelligence e análise de dados",
		summary: "Junta o que está espalhado e devolve um painel que a gestão realmente abre para decidir.",
		examples: [
			"Vendas, prazo e retrabalho no mesmo lugar, cada um com a fonte visível.",
			"Indicadores desenhados para a pergunta da área, não um export genérico.",
			"Dados de mais de um sistema consolidados sem fechamento manual.",
			"Leitura comercial e operacional no ritmo da semana, não do trimestre."
		],
		cta: "Ver um painel para o meu negócio",
		challenge: "visibilidade",
		detail: "Quero um painel com os indicadores que a gestão precisa ver, a partir dos sistemas que já temos."
	},
	{
		id: "ia",
		name: "Inteligência artificial",
		summary: "IA aplicada ao trabalho que já existe: consultar, classificar e tirar texto de documento — dentro do sistema, não num chat solto.",
		examples: [
			"Um assistente interno responde onde está o pedido com o dado do sistema.",
			"Documentos repetidos são separados antes de alguém abrir um por um.",
			"Informação presa em PDF ou e-mail vira campo que o processo consegue usar.",
			"Atendimento e tarefas administrativas seguem roteiro, com uma pessoa nas exceções."
		],
		cta: "Avaliar onde a IA cabe de verdade",
		challenge: "decisao",
		detail: "Quero avaliar se inteligência artificial resolve uma tarefa concreta da operação, integrada ao que já usamos."
	},
	{
		id: "software",
		name: "Desenvolvimento de software",
		summary: "Sistemas internos, APIs e aplicações web quando a ferramenta pronta não cabe no jeito que a empresa trabalha.",
		examples: [
			"Um sistema no lugar de cinco planilhas que só uma pessoa entende.",
			"Uma API para o que hoje é copiado entre telas.",
			"Aplicação web ou plataforma para um processo que é só de vocês.",
			"Modernização do legado em partes, sem parar a operação."
		],
		cta: "Conversar sobre um sistema sob medida",
		challenge: "sistemas",
		detail: "Preciso de um sistema ou integração sob medida para um processo que as ferramentas atuais não cobrem."
	},
	{
		id: "consultoria",
		name: "Consultoria e transformação digital",
		summary: "Antes de construir: enxergar o processo, o gargalo e o que devolve tempo ou controle com o menor passo útil.",
		examples: [
			"Mapa do processo como ele acontece, não como o organograma descreve.",
			"Lista curta do que vale automatizar primeiro, com esforço e efeito esperado.",
			"Diagnóstico de onde o dado se perde entre áreas.",
			"Um plano que cabe no time e nas ferramentas que a empresa já tem."
		],
		cta: "Pedir um diagnóstico",
		challenge: "manual",
		detail: "Quero um diagnóstico da operação: onde está o gargalo e qual solução tende a ter retorno primeiro."
	}
];
var solutionMatches = {
	manual: ["automacao", "consultoria"],
	espalhado: [
		"bi",
		"software",
		"automacao"
	],
	relatorios: ["bi", "automacao"],
	visibilidade: ["bi", "consultoria"],
	sistemas: ["automacao", "software"],
	decisao: [
		"bi",
		"ia",
		"consultoria"
	]
};
function challengeLabel(id) {
	return challenges.find((item) => item.id === id)?.label ?? id;
}
function recommend(ids) {
	const scores = /* @__PURE__ */ new Map();
	for (const id of ids) for (const solutionId of solutionMatches[id]) {
		const because = scores.get(solutionId) ?? [];
		because.push(id);
		scores.set(solutionId, because);
	}
	return [...scores.entries()].map(([id, because]) => ({
		solution: solutions.find((item) => item.id === id),
		because
	})).sort((a, b) => b.because.length - a.because.length);
}
var steps = [
	{
		n: "01",
		title: "Diagnóstico",
		body: "Entendemos o cenário, os sistemas em uso e o que a operação precisa melhorar de fato."
	},
	{
		n: "02",
		title: "Estratégia",
		body: "Escolhemos por onde começar e a solução que cabe — nem a menor, nem a mais cara."
	},
	{
		n: "03",
		title: "Implementação",
		body: "Desenvolvemos, integramos e validamos com quem usa o processo no dia a dia."
	},
	{
		n: "04",
		title: "Evolução",
		body: "Acompanhamos o efeito na rotina e ajustamos o que os números e o time mostrarem."
	}
];
var principles = [
	{
		title: "Problema real, não catálogo",
		body: "A conversa começa no que trava a operação. A tecnologia é a resposta, não o ponto de partida."
	},
	{
		title: "O que a empresa já usa",
		body: "CRM, ERP, planilha e o sistema legado entram no desenho. Trocar tudo não é pré-requisito."
	},
	{
		title: "Efeito que dá para acompanhar",
		body: "Menos retrabalho, menos espera, menos erro, mais controle. O que não dá para observar não vira promessa."
	},
	{
		title: "Base segura para evoluir",
		body: "Arquitetura organizada, acesso no tamanho certo e um caminho claro para o próximo passo."
	},
	{
		title: "Conversa clara no caminho",
		body: "Quem decide e quem opera sabem o que está sendo feito, o que ficou de fora e por quê."
	}
];
var opsNodes = [
	{
		id: "pedidos",
		label: "Pedidos",
		system: "Comercial",
		metric: "42",
		unit: "em aberto",
		note: "Uma entrada só. O pedido não nasce de novo numa planilha.",
		series: [
			42,
			55,
			48,
			62,
			58,
			70,
			66,
			78
		]
	},
	{
		id: "aprovacao",
		label: "Aprovação",
		system: "Workflow",
		metric: "3",
		unit: "exceções na fila",
		note: "A regra libera o caso comum. Alguém olha só o que fugiu.",
		series: [
			24,
			30,
			22,
			18,
			28,
			16,
			20,
			14
		]
	},
	{
		id: "financeiro",
		label: "Financeiro",
		system: "ERP",
		metric: "186",
		unit: "mil no ciclo",
		note: "O título aponta para o pedido que o originou.",
		series: [
			32,
			38,
			44,
			41,
			52,
			60,
			66,
			74
		]
	},
	{
		id: "painel",
		label: "Indicadores",
		system: "Painel",
		metric: "18h",
		unit: "ciclo médio",
		note: "O número sai do processo, não de um fechamento manual.",
		series: [
			82,
			76,
			74,
			68,
			64,
			60,
			56,
			48
		]
	}
];
var performanceSeries = [
	{
		name: "S1",
		valor: 86
	},
	{
		name: "S2",
		valor: 90
	},
	{
		name: "S3",
		valor: 88
	},
	{
		name: "S4",
		valor: 94
	},
	{
		name: "S5",
		valor: 97
	},
	{
		name: "S6",
		valor: 101
	},
	{
		name: "S7",
		valor: 108
	},
	{
		name: "S8",
		valor: 112
	}
];
var regionSeries = [
	{
		name: "Norte",
		valor: 94
	},
	{
		name: "Centro",
		valor: 88
	},
	{
		name: "Sul",
		valor: 91
	},
	{
		name: "Leste",
		valor: 86
	}
];
var orderStages = [
	{
		title: "Pedido recebido",
		detail: "PED-1042 entrou pelo canal comercial."
	},
	{
		title: "Conferência",
		detail: "Itens, preço e cadastro batem com a regra."
	},
	{
		title: "Aprovação",
		detail: "Dentro da alçada. Segue sem fila humana."
	},
	{
		title: "Faturamento",
		detail: "O título nasce no financeiro com o mesmo número."
	},
	{
		title: "Painel atualizado",
		detail: "Ciclo e exceção já aparecem no indicador."
	}
];
var assistantPrompts = [
	{
		id: "prazo",
		ask: "Quantos pedidos passaram do prazo esta semana?",
		answer: "14 pedidos passaram do prazo. Oito estão na unidade Centro, concentrados na conferência.",
		source: "Fonte ilustrativa: fila de pedidos da operação de demonstração."
	},
	{
		id: "excecao",
		ask: "Qual etapa concentra as exceções?",
		answer: "A conferência de cadastro. As outras etapas seguem a regra e não param na fila.",
		source: "Fonte ilustrativa: workflow de aprovação da mesma operação."
	},
	{
		id: "ciclo",
		ask: "Qual é o ciclo médio até o faturamento?",
		answer: "18 horas na demonstração. Na semana anterior o painel marcava 21 horas.",
		source: "Fonte ilustrativa: painel de ciclo, não um modelo ao vivo."
	}
];
var defaultBrief = `Olá, ${site.name}. Quero entender como reduzir trabalho manual e enxergar melhor a operação. Podemos conversar?`;
function buildBrief(input) {
	return [
		`Olá, ${site.name}.`,
		"",
		`Sou ${input.name.trim()}, da ${input.company.trim()}.`,
		`E-mail: ${input.email.trim()}`,
		`Telefone: ${input.phone.trim()}`,
		`Principal desafio: ${challengeLabel(input.challenge)}`,
		input.detail.trim() ? `Necessidade: ${input.detail.trim()}` : "Necessidade: a combinar na conversa."
	].join("\n");
}
//#endregion
export { challenges as a, opsNodes as c, principles as d, recommend as f, steps as h, challengeLabel as i, orderStages as l, solutions as m, buildBrief as n, defaultBrief as o, regionSeries as p, challengeIds as r, nav as s, assistantPrompts as t, performanceSeries as u };
