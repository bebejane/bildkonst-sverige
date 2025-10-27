import { buildClient } from '@datocms/cma-client-node';

export default buildClient({
	apiToken: process.env.DATOCMS_API_TOKEN as string,
	environment: process.env.DATOCMS_ENVIRONMENT,
});
