import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Unit extends BaseEntity{

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column()
  description: string

}