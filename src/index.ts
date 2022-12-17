const gql = String.raw;

type CustomFetch = typeof fetch;

class GraphQLClient {
	resource: string;
	init: RequestInit;
	#Fetch: typeof fetch = fetch;

	constructor(resource: string, init: RequestInit = {}) {
		init.method = init.method || 'post';
		init.headers = init.headers || {};
		(init.headers as Record<string, string>)['content-type'] =
			(init.headers as Record<string, string>)['content-type'] ||
			'application/json';

		this.resource = resource;
		this.init = init;
	}

	public customFetch(fetch: CustomFetch) {
		const client = new GraphQLClient(this.resource, this.init);
		client.#Fetch = fetch;

		return client;
	}

	public async request<TResponse>(
		query: string,
		variables = {}
	): Promise<
		| { data: TResponse; errors: undefined }
		| { data: undefined; errors: unknown[] }
	> {
		this.init.body = JSON.stringify({ query, variables });

		try {
			return (await this.#Fetch(this.resource, this.init)).json();
		} catch (e) {
			return new Promise(() => {
				return {
					errors: [e],
				};
			});
		}
	}
}

export { gql, GraphQLClient };
