// src/index.ts

import "reflect-metadata";
import { AppDataSource } from "./data-source"
import { ApolloServer } from "apollo-server";
import { buildSchema, GraphQLISODateTime } from "type-graphql";
import { ReportsResolver } from "./graphql/resolvers/ReportsResolver";
import { DateResolver } from "graphql-scalars";
import { GraphQLScalarType } from "graphql";
const PORT = 8090

// Initializes the Datasource for TypeORM
AppDataSource.initialize().then(async () => {
  const schema = await buildSchema({
    resolvers: [ReportsResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateResolver }],
    dateScalarMode:"isoDate"
  })
  const server = new ApolloServer({ schema })
  await server.listen(4000)
  console.log("Server has started!")
  console.log("Check it out at: http://localhost:4000")
}).catch((err) => {
 console.error(err.stack)
})