import { Entity, Column, PrimaryGeneratedColumn,  ManyToOne, JoinColumn, BaseEntity, Timestamp } from 'typeorm'
import { PizzaType } from './Pizza_Type';
import { ObjectType, Field, ID } from "type-graphql";

import { DateResolver } from "graphql-scalars";

@Entity()
@ObjectType()
export class Order extends BaseEntity{
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => DateResolver)
  @Column({type:'timestamp'})
  date: Date

  @Field(() => PizzaType)
  @ManyToOne(() => PizzaType)
  @JoinColumn()
  pizza_type: PizzaType;

  @Field(() => Number)
  @Column()
  qty: number
}