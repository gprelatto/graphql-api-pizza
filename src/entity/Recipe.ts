import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm'
import { Ingredient } from './Ingredient';
import { PizzaType } from './Pizza_Type';
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Recipe extends BaseEntity{
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => PizzaType)
  @ManyToOne(() => PizzaType)
  @JoinColumn()
  pizza_type: PizzaType;

  @Field(() => Ingredient)
  @ManyToOne(() => Ingredient)
  @JoinColumn()
  ingredient: Ingredient;

  @Field(() => Number)
  @Column()
  qty: number

}