import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm'
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class PizzaType extends BaseEntity{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column()
  description: string

  @Field(() => Number)
  @Column({ type: 'numeric'})
  price: number
}