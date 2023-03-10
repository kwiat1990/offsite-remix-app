# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

Start the Remix development asset server and the Express server by running:

```sh
npm run dev
```

This starts your app in development mode, which will purge the server require cache when Remix rebuilds assets so you don't need a process manager restarting the express server.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### Database

We're using SQLite along with Prisma.

To create database based on schema in `prisma/schema.prisma`:

```sh
npx prisma migrate dev
```

To send queries to the database:

```sh
npx prisma db seed
```

To push the initial schema to the database (without any data):

```sh
npx prisma db push
```

To see current state of the database:

```sh
npx prisma studio
```
