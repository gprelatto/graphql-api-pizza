import { MigrationInterface, QueryRunner } from "typeorm";

export class $name1672765988210 implements MigrationInterface {
    name = '$name1672765988210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "unit" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "cost" numeric NOT NULL, "unitId" integer, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pizza_type" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "price" numeric NOT NULL, CONSTRAINT "PK_589be83ba47283eb9bd1bd464e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "date" date NOT NULL, "qty" integer NOT NULL, "pizzaTypeId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "qty" integer NOT NULL, "pizzaTypeId" integer, "ingredientId" integer, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_5c15451ee870cfe7294ee1b5946" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_69b63ef6cc3c8af36788885067e" FOREIGN KEY ("pizzaTypeId") REFERENCES "pizza_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_c28b812a3a8c1d583bb59b2b9ba" FOREIGN KEY ("pizzaTypeId") REFERENCES "pizza_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_96b31d139569e3b031ec54339a9" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_96b31d139569e3b031ec54339a9"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_c28b812a3a8c1d583bb59b2b9ba"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_69b63ef6cc3c8af36788885067e"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_5c15451ee870cfe7294ee1b5946"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "pizza_type"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "unit"`);
    }

}
