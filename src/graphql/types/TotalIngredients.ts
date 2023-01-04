import { Field, InterfaceType, ObjectType } from "type-graphql";

@ObjectType()
export abstract class TotalIngredients {
  @Field(type => String)
  ingredient: string;
  @Field(type => String)
  unit: string;
  @Field(type => Number)
  totalused: number;
  @Field(type => Number)
  totalcost: number;
}