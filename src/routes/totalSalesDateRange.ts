import express from "express";
import { Order } from "../entity/Order";
import pizzaFilter from "../utils/validateFilter";
const router = express.Router();


router.get('/get/by-date', async function(req, res) {
    const result = await Order.query(`
        select pt.description as PizzaType, sum(o.qty) as QtySold,sum(distinct pt.price) as Price, (sum(o.qty) * sum(distinct pt.price)) as TotalSales
        from "order" o 
        join pizza_type pt on pt.id = o."pizzaTypeId" 
        group by 1
    `)
    res.send(result);
});

router.post('/by-date', async function(req, res) {
    try {
        console.log(req.body)
        const date_from = req.body.date_from;
        const date_to = req.body.date_to;
        const pizza_type = req.body.pizza_type;
    
        const result = await Order.query(`
            select pt.description as PizzaType, sum(o.qty) as QtySold,sum(distinct pt.price) as Price, (sum(o.qty) * sum(distinct pt.price)) as TotalSales
            from "order" o 
            join pizza_type pt on pt.id = o."pizzaTypeId" 
            where (o.date between '${date_from}' and '${date_to}') ${pizzaFilter(pizza_type)}
            group by 1
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
            select DATE_PART('week',o.date) as Week,pt.description as PizzaType, sum(o.qty) as QtySold,sum(distinct pt.price) as Price, (sum(o.qty) * sum(distinct pt.price)) as TotalSales
            from "order" o 
            join pizza_type pt on pt.id = o."pizzaTypeId" 
            where (o.date between '${date_from}' and '${date_to}') ${pizzaFilter(pizza_type)}
            group by 1,2
        `)
        res.send(result);
    } catch (error) {
        res.status(500).send()
    }

});

export default router;