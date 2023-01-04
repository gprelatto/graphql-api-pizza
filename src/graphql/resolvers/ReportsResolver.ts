import { Resolver, Query, Arg, InterfaceType, Field, Int, ID } from "type-graphql";
import { Ingredient } from "../../entity/Ingredient";
import { Order } from "../../entity/Order";
import pizzaFilter from "../../utils/validateFilter";
import { TotalIngredients } from "../types/TotalIngredients";
import { TotalSales } from "../types/TotalSales";


@Resolver()
export class ReportsResolver {


  @Query(() => [TotalSales])
  async totalSalesByDateRange(@Arg("FromDate") dateFrom: string,@Arg("ToDate") dateTo: string, @Arg("PizzaType", { nullable: true }) pizzaType: string) {

    const result = Order.query(`
      select pt.description as PizzaType, sum(o.qty) as QtySold,sum(distinct pt.price) as Price, (sum(o.qty) * sum(distinct pt.price)) as TotalSales
      from "order" o 
      join pizza_type pt on pt.id = o."pizzaTypeId" 
      where (o.date between '${dateFrom}' and '${dateTo}') ${pizzaFilter(pizzaType)}
      group by 1
    `)
    return result
  }
  
  @Query(() => [TotalSales])
  async totalSalesByMonth(@Arg("selectedMonth") selectedMonth: number, @Arg("PizzaType", { nullable: true }) pizzaType: string) {

    const result = Order.query(`
      select pt.description as PizzaType, sum(o.qty) as QtySold,sum(distinct pt.price) as Price, (sum(o.qty) * sum(distinct pt.price)) as TotalSales
      from "order" o 
      join pizza_type pt on pt.id = o."pizzaTypeId" 
      where (EXTRACT( MONTH from o.date) = '${selectedMonth}') ${pizzaFilter(pizzaType)}
      group by 1
    `)
    return result
  }

  @Query(() => [TotalIngredients])
  async totalIngredientsByDateRange(@Arg("FromDate") dateFrom: string,@Arg("ToDate") dateTo: string, @Arg("PizzaType", { nullable: true }) pizzaType: string) {

    const result = Order.query(`
    -- Total Sales per Pizza Type
    with cte_total_sales as (
      select o.date,pt.description as PizzaType, sum(o.qty) as QtySold,sum(pt.price) as Price, sum(pt.price * o.qty) as TotalSales
      from "order" o 
      join pizza_type pt on pt.id = o."pizzaTypeId" 
      where (o.date between '${dateFrom}' and '${dateTo}') ${pizzaFilter(pizzaType)}
      group by 1,2
    ),
    -- Ingredients per Pizza Type
    cte_total_ingredients as (
      select pt.description as PizzaType, 
          i.description as Ingredient, 
          u.description as Unit, 
          sum(r.qty) as Qty, 
          sum(i."cost") as Cost, 
          sum(r.qty * i."cost") as TotalCost
      from pizza_type pt
      join recipe r on r."pizzaTypeId" = pt.id 
      join ingredient i on i.id = r."ingredientId" 
      join unit u on u.id = i."unitId" 
      group by 1,2,3
    ),
    cte_total_ingredients_used as (
      select cts.PizzaType, cts.QtySold, Ingredient, Unit, Qty, cost, (qtySold * qty) as TotalUsed, ((qtySold * qty) * Cost) TotalCost
      from cte_total_sales cts 
      join cte_total_ingredients cti on cts.PizzaType = cti.PizzaType
    )
    select ingredient, unit, sum(totalUsed) TotalUsed, sum(totalCost) TotalCost from cte_total_ingredients_used group by 1,2
    `)
    return result
  }

  @Query(() => [TotalIngredients])
  async totalIngredientsByMonth(@Arg("selectedMonth") selectedMonth: number, @Arg("PizzaType", { nullable: true }) pizzaType: string) {

    const result = Order.query(`
      -- Total Sales per Pizza Type
      with cte_total_sales as (
        select o.date,pt.description as PizzaType, sum(o.qty) as QtySold,sum(pt.price) as Price, sum(pt.price * o.qty) as TotalSales
        from "order" o 
        join pizza_type pt on pt.id = o."pizzaTypeId" 
        where (EXTRACT( MONTH from o.date) = '${selectedMonth}') ${pizzaFilter(pizzaType)}
        group by 1,2
      ),
      -- Ingredients per Pizza Type
      cte_total_ingredients as (
        select pt.description as PizzaType, 
            i.description as Ingredient, 
            u.description as Unit, 
            sum(r.qty) as Qty, 
            sum(i."cost") as Cost, 
            sum(r.qty * i."cost") as TotalCost
        from pizza_type pt
        join recipe r on r."pizzaTypeId" = pt.id 
        join ingredient i on i.id = r."ingredientId" 
        join unit u on u.id = i."unitId" 
        group by 1,2,3
      ),
      cte_total_ingredients_used as (
        select cts.PizzaType, cts.QtySold, Ingredient, Unit, Qty, cost, (qtySold * qty) as TotalUsed, ((qtySold * qty) * Cost) TotalCost
        from cte_total_sales cts 
        join cte_total_ingredients cti on cts.PizzaType = cti.PizzaType
      )
      select ingredient, unit, sum(totalUsed) TotalUsed, sum(totalCost) TotalCost from cte_total_ingredients_used group by 1,2
      `)
    return result
  }

 


}