// src/index.ts

import "reflect-metadata";
import { AppDataSource } from "./data-source"
import { ApolloServer } from "apollo-server-express";
import { buildSchema, GraphQLISODateTime } from "type-graphql";
import { ReportsResolver } from "./graphql/resolvers/ReportsResolver";
import { DateResolver } from "graphql-scalars";
import { GraphQLScalarType } from "graphql";
import express from 'express';
import salesRouter from "./routes/totalSalesDateRange";
import ingredientsRouter from "./routes/totalIngredientsDateRange";

const PORT = 8090;

// Initializes the Datasource for TypeORM
AppDataSource.initialize().then(async () => {
  const app = express();
  const schema = await buildSchema({
    resolvers: [ReportsResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateResolver }],
    dateScalarMode:"isoDate"
  })
  const server = new ApolloServer({ schema })
  await server.start()
  server.applyMiddleware({ app })
  
  app.use(express.json())
  app.use('/api/sales/',salesRouter);
  app.use('/api/ingredients/',ingredientsRouter);
  
  app.listen(PORT, () => {
    console.log("Server has started!")
    console.log(`[API URL]: http://localhost:${PORT}/api`)
    console.log(`[GraphQL URL]: http://localhost:${PORT}/graphql`)
  })
}).catch((err) => {
 console.error(err.stack)
})