import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm'
import { Unit } from './Unit';
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Ingredient extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column()
  description: string

  @Field(() => Unit)
  @ManyToOne(() => Unit)
  @JoinColumn()
  unit: Unit;

  @Field(() => Number)
  @Column({ type: 'numeric'})
  cost: number

}