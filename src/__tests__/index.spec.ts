import 'isomorphic-unfetch'; // fetch polyfill

import { GraphQLClient, gql } from '@src/index';

const query = gql`
	query Country($code: ID!) {
		country(code: $code) {
			native
		}
	}
`;

const variables = {
	code: 'DE',
};

const client = new GraphQLClient('https://countries.trevorblades.com/graphql', {
	mode: 'cors',
	headers: {
		'X-Custom': 'header',
	},
});

describe('should fetch info on Germany', () => {
	it('using native fetch', async () => {
		const response = await client.request<{ country: { native: string } }>(
			query,
			variables
		);

		expect(JSON.stringify(response)).toEqual(
			JSON.stringify({ data: { country: { native: 'Deutschland' } } })
		);
	});

	it('using custom fetch', async () => {
		const response = await client
			.customFetch(fetch)
			.request<{ country: { native: string } }>(query, variables);

		expect(JSON.stringify(response)).toEqual(
			JSON.stringify({ data: { country: { native: 'Deutschland' } } })
		);
	});
});
