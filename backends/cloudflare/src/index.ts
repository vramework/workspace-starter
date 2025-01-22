import { runFetch, runScheduled } from '@vramework/cloudflare';
import { createSessionServices } from '@vramework-workspace-starter/functions/src/services';
import { setupServices } from './setup-services.js';
import { ExportedHandler, Response } from '@cloudflare/workers-types';

import '@vramework-workspace-starter/functions/.vramework/vramework-bootstrap.gen.js';

export default {
	async scheduled(controller, env) {
		const singletonServices = await setupServices(env);
		await runScheduled(controller, singletonServices);
	},

	async fetch(request, env): Promise<Response> {
		const singletonServices = await setupServices(env);
		return await runFetch(request, singletonServices, createSessionServices);
	},
} satisfies ExportedHandler<Record<string, string>>;
