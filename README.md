## Book Search API [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/otegecmis/book-search-api/blob/main/LICENSE.md)

- A backend API for book search, built with `Node.js`, `PostgreSQL`, `Express.js` and `JavaScript.`
- It follows a `Layered Architecture` (MVC, Service, Repository).
- Used `Prisma ORM` for database management.
- Implemented `Redis` for authentication blacklisting to handle invalid tokens and `JSON Web Token (JWT)` for secure token-based authentication.
- Documented the API with `Swagger` and `JSDoc` for clear developer references.
- Wrote unit and integration tests with `Jest` and `SuperTest`.
- Set up automatic `Semantic Release` using `GitHub Actions` for version management.

### 0. Important Note

Please use `Red Hat Dependency Analytics` to scan dependencies for vulnerabilities before starting development.

### 1. Documentation

Two types of documentation have been prepared: `Swagger` and `JSDoc.` 

#### 1.Swagger

To access `Swagger` documentation, make sure the `NODE_ENV` in the `.env` file is set to `development`.

Then, you can access it via `api/swagger`.

<div style="float: left;">
    <img src="assets/1.png" style="width: 60%;" />
</div>

#### JSDoc

To access `JSDoc`, run the command `npm run doc` from the root directory of the project. The documentation will be available in the newly created `docs` folder.

<div style="float: left;">
    <img src="assets/2.png" style="width: 60%;" />
</div>

### 2. Installation

1. **Clone the repository**

```sh
git clone https://github.com/otegecmis/book-search-api.git
```

2. **Navigate to the project directory**

```sh
cd book-search-api
```

> *🚧 Necessary information will be added soon.*