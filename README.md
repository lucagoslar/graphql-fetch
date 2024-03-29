## @lucagoslar/graphql-fetch

A small optionally typed 📊QL client leveraging the fetch API. (~435 B min + gz)

[![build package and run tests](https://github.com/lucagoslar/graphql-fetch/actions/workflows/main.yml/badge.svg)](https://github.com/lucagoslar/graphql-fetch/actions/workflows/main.yml)

## Index

- [@lucagoslar/graphql-fetch](#lucagoslargraphql-fetch)
- [Index](#index)
- [Usage](#usage)
- [API](#api)
    - [new GraphQLClient(resource, init?)](#new-graphqlclientresource-init)
    - [new GraphQLClient#customFetch(fetch)](#new-graphqlclientcustomfetchfetch)
      - [new GraphQLClient#customFetch#request(query, variables?)](#new-graphqlclientcustomfetchrequestquery-variables)
    - [new GraphQLClient#request(query, variables?)](#new-graphqlclientrequestquery-variables)
- [Bundle size](#bundle-size)
- [Contribute](#contribute)
  - [Getting started](#getting-started)

## Usage

1. Import, instantiate and set up a client.

```ts
import { GraphQLClient } from '@lucagoslar/graphql-fetch';

const resource: string = 'ENDPOINT';
const init: RequestInit = {
	mode: 'cors',
	headers: {
		Authorization: '<auth-scheme> <credentials>',
	},
};

const client = new GraphQLClient(resource, init);
```

2. Create a GraphQL query or mutation.

```ts
import { gql } from '@lucagoslar/graphql-fetch';

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
```

1. Pass optional parameters when executing a request and handle the response.

```ts
const result = await client.request<{ country: { native: string } }>(
	query,
	variables
);

console.log(result); // { data: { country: { native: 'Deutschland' } }, errors: undefined }
```

Optionally add a custom fetch function.

```ts
// Example with SvelteKit
// +page.server.ts

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
	const result = await client
		.customFetch(request.fetch)
		.request<{ country: { native: string } }>(query, variables);

	return result;
};
```

## API

#### new GraphQLClient(resource, init?)

- `resource`: string
- `init`: RequestInit

#### new GraphQLClient#customFetch(fetch)

- `fetch`: fetch Function

##### new GraphQLClient#customFetch#request(query, variables?)

- `query`: string
- `variables`: Object

#### new GraphQLClient#request(query, variables?)

- `query`: string
- `variables`: Object

## Bundle size

Note that the bundle size depends on your build configuration.

## Contribute

Contributions of any kind are very much appreciated.

### Getting started

Install all (dev-)dependencies by running the following.

```
  npm i
```

Make sure [husky](https://github.com/typicode/husky) is being installed too.

```
  npm run prepare
```

\
_And off we go …_

Build this project with the following.

```
npm run build
```
