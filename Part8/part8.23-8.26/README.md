# Running the server

Run the server from the root of the project with:

```bash
node index.js
```

The server will start at:

```
http://localhost:4000/
```

This exposes the Apollo GraphQL endpoint and playground (you can interact with queries and mutations there, similar to using Postman).

---

## Authentication

Some operations (for example `addBook` and `editAuthor`) require authentication.

1. Log in as a user using the login mutation (or whatever login endpoint your API exposes) and copy the returned token.
2. In your GraphQL client or Apollo Playground, add the token to the request headers as:

```
Authorization: Bearer <your.jwt.token.here>
```

> Example header key in Apollo Playground / GraphQL clients: `Headers` → `{ "Authorization": "Bearer <token>" }`

---

## Example mutations

### Login (example)

```graphql
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
```

Use the returned `value` as your token (replace `<your.jwt.token.here>` above).

### addBook (example)

```graphql
mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    id
    title
    author {
      name
      id
    }
    published
    genres
  }
}
```

### editAuthor (example)

```graphql
mutation EditAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
    id
  }
}
```

> **Remember:** `addBook` and `editAuthor` require the Authorization header described above.

---

## Tips

* If you use a GUI client (Apollo Studio, GraphQL Playground, Insomnia, Postman), look for the place to add HTTP headers and include the `Authorization` header.
* When testing, confirm the token hasn't expired; re-login if you get authentication errors.
* If your server uses a different login field name or different mutation names, adapt the examples above accordingly.

---

If you'd like, I can:

* Add README badges (build / tests),
* Create a shorter `QUICKSTART.md`, or
* Add curl examples for quick testing.

Tell me which and I will update the file.
