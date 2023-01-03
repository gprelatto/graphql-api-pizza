import { MigrationInterface, QueryRunner } from "typeorm"

export class $name1672766000377 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO public.unit (id,description) VALUES (1,'slice'),(2,'gram'),(3,'pizza');`);
        await queryRunner.query(`INSERT INTO public.pizza_type (id,description,price) VALUES (1,'Pepperoni',19),(2,'Branco',15),(3,'All Dressed',21);`);
        await queryRunner.query(`INSERT INTO public.ingredient (id,description,"unitId","cost") VALUES (1,'Pepperoni',1,0.12),(2,'Cheese',2,0.07),(3,'Vedgetable',2,0.3),(4,'Dough',3,1.1),(5,'Sauce',3,0.78);`);
        await queryRunner.query(`INSERT INTO public.recipe (id,qty,"pizzaTypeId","ingredientId") VALUES (3,16,1,1),(4,40,1,2),(5,1,1,4),(6,1,1,5),(7,90,2,2),(8,1,2,4),(9,1,2,5),(10,8,3,1),(11,30,3,2),(12,30,3,3),(13,1,3,4),(14,1,3,5);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
