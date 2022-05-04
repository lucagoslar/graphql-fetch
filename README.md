## @lucagoslar/graphql-fetch

A small 📊QL client leveraging the fetch API. (~335 B min + gz)

[![build package and run tests](https://github.com/lucagoslar/graphql-fetch/actions/workflows/main.yml/badge.svg)](https://github.com/lucagoslar/graphql-fetch/actions/workflows/main.yml)

## Index

- [@lucagoslar/graphql-fetch](#lucagoslargraphql-fetch)
- [Index](#index)
- [Usage](#usage)
- [API](#api)
		- [new GraphQLClient(resource, init?)](#new-graphqlclientresource-init)
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
```

3. Pass optional parameters when executing a request and handle the response.

```ts
let variables = {
	code: 'DE',
};

try {
	const result = await client.request(query, variables);
	console.log(result); // { data: { country: { native: 'Deutschland' } }, errors: undefined }
} catch (e) {
	throw e;
}
```

## API

#### new GraphQLClient(resource, init?)

- `resource`: string
- `init`: RequestInit

#### new GraphQLClient#request(query, variables?)

- `query`: string
- `variables`: Object

## Bundle size

Note that the bundle size depends on your configuration.

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
