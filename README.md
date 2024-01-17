## quick start
```
npm start

```

## update db table
- update file prisma/schema.prisma
- npm run start:db 
  ``` equals to following three commands
  npm run migrate:dev
  npm run prisma:generate
  npm run seed
  ```
- npm start (automatically update file src/schema.graphql)
- [GraphQL Playground](http://localhost:3000/graphql): http://localhost:3000/graphql
- npx prisma studio
- [Prisma GUI](http://localhost:5555): http://localhost:5555

## Text to Image
[local library - deep-floyd/IF](https://github.com/deep-floyd/IF)
[more local open source libraries](https://www.edenai.co/post/top-free-image-generation-tools-apis-and-open-source-models)

## audio to text

## audio split

##  translation

## API Platforms
[edenai](https://app.edenai.run/bricks/default)
[eden-ai-vs-hugging-face](https://hackernoon.com/eden-ai-vs-hugging-face-use-cases-target-users-and-value-propositions)

## JWT Auth
- [official doc](https://docs.nestjs.com/security/authentication)