import 'isomorphic-unfetch'; // fetch polyfill

import { GraphQLClient, gql } from '@src/index';

const query = gql`
	query Country($code: ID!) {
		country(code: $code) {
			native
		}
	}
`;

const client = new GraphQLClient('https://countries.trevorblades.com/graphql', {
	mode: 'cors',
	headers: {
		'X-Custom': 'header',
	},
});

it('should fetch info on Germany', async () => {
	try {
		const response = await client.request(query, { code: 'DE' });

		expect(JSON.stringify(response)).toEqual(
			JSON.stringify({ data: { country: { native: 'Deutschland' } } })
		);
	} catch (e) {
		throw e;
	}
});
