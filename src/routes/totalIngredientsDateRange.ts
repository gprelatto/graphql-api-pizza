
import express from "express";
import { Order } from "../entity/Order";
import pizzaFilter from "../utils/validateFilter";
const router = express.Router();


router.post('/by-date', async function(req, res) {
    try {
        const date_from = req.body.date_from;
        const date_to = req.body.date_to;
        const pizza_type = req.body.pizza_type;
    
        const result = await Order.query(`
        -- Total Sales per Pizza Type
        with cte_total_sales as (
        select o.date,pt.description as PizzaType, sum(o.qty) as QtySold,sum(pt.price) as Price, sum(pt.price * o.qty) as TotalSales
        from "order" o 
        join pizza_type pt on pt.id = o."pizzaTypeId" 
        where (o.date between '${date_from}' and '${date_to}') ${pizzaFilter(pizza_type)}
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
        res.send(result);
    } catch (error) {
        res.status(500).send()
    }
    
});

router.post('/by-date/by-week', async function(req, res) {
    try {
        const date_from = req.body.date_from;
        const date_to = req.body.date_to;
        const pizza_type = req.body.pizza_type;
      
        const result = await Order.query(`
        -- Total Sales per Pizza Type
        with cte_total_sales as (
          select o.date,pt.description as PizzaType, sum(o.qty) as QtySold,sum(pt.price) as Price, sum(pt.price * o.qty) as TotalSales
          from "order" o 
          join pizza_type pt on pt.id = o."pizzaTypeId" 
          where (o.date between '${date_from}' and '${date_to}') ${pizzaFilter(pizza_type)}
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
          select DATE_PART('week',date) as Week,cts.PizzaType, cts.QtySold, Ingredient, Unit, Qty, cost, (qtySold * qty) as TotalUsed, ((qtySold * qty) * Cost) TotalCost
          from cte_total_sales cts 
          join cte_total_ingredients cti on cts.PizzaType = cti.PizzaType
        )
        select week,ingredient, unit, sum(totalUsed) TotalUsed, sum(totalCost) TotalCost from cte_total_ingredients_used group by 1,2,3
        `)
        res.send(result);        
    } catch (error) {
        res.status(500).send()
    }
    
});

export default router;