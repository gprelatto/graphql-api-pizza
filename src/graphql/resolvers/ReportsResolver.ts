import { Resolver, Query, Arg } from "type-graphql";
import { Ingredient } from "../../entity/Ingredient";
import { Order } from "../../entity/Order";

@Resolver()
export class ReportsResolver {

  @Query(() => [Order])
  orderByDateRange(@Arg("FromDate") dateFrom: string,@Arg("ToDate") dateTo: string) {
    const orders = Order.find()
    return orders
  }
  

  ingredientById(@Arg("id") id: number) {
    return Ingredient.findOne({ where: { id },relations:{unit:true}});
  }


}