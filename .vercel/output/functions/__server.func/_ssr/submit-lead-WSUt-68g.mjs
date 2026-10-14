import { n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/submit-lead-WSUt-68g.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var submitLead_createServerFn_handler = createServerRpc({
	id: "69539f695a1de482dba8ecbca729007c78ddee918f6703ca8ceee21121291609",
	name: "submitLead",
	filename: "src/lib/crm/submit-lead.ts"
}, (opts) => submitLead.__executeServer(opts));
var submitLead = createServerFn({ method: "POST" }).validator((data) => data).handler(submitLead_createServerFn_handler, async ({ data }) => {
	const { getRequest } = await import("./ssr.mjs").then((n) => n.a).then((n) => n.t);
	const { ingestLead } = await import("./ingest.server-DL8YeU70.mjs");
	return ingestLead(data, (getRequest().headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || "local");
});
//#endregion
export { submitLead_createServerFn_handler };
