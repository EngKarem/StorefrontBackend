# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm\yarn` in your terminal at the project root.

Create `.env` File Contain:
```
ENV
POSTGRES_HOST
POSTGRES_DB
POSTGRES_PORT
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB_TEST
BCRYPT_PASSWORD
SALT_ROUNDS
TOKEN_SECRET
```
## DataBase

##### `Main Database` -> storefront
##### `test Database` -> test
```
CREATE DATABASE storefront;
CREATE DATABASE test;
```

## Scripts:
- test app -> npm run test
- start app -> npm run start
- build app -> npm run dev // npx tsc
- npm run watch 
- npm run migrationup 
