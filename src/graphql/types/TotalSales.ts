import { Field, InterfaceType, ObjectType } from "type-graphql";

@ObjectType()
export abstract class TotalSales {
  @Field(type => String)
  pizzatype: string;
  @Field(type => Number)
  qtysold: number;
  @Field(type => Number)
  price: number;
  @Field(type => Number)
  totalsales: number;
}