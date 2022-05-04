const gql = String.raw;

class GraphQLClient {
	resource: string;
	init: RequestInit;

	constructor(resource: string, init: RequestInit = {}) {
		init.method = init.method || 'post';
		init.headers = init.headers || {};
		(init.headers as Record<string, string>)['content-type'] =
			(init.headers as Record<string, string>)['content-type'] ||
			'application/json';

		this.resource = resource;
		this.init = init;
	}

	public async request(query: string, variables = {}) {
		this.init.body = JSON.stringify({ query, variables });

		try {
			return (await fetch(this.resource, this.init)).json();
		} catch (e) {
			return { errors: [e] };
		}
	}
}

export { gql, GraphQLClient };
