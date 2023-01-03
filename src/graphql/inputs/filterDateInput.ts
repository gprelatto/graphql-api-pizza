import { Field, InputType } from "type-graphql";

@InputType()
export class FilterDateInput {
    @Field()
    public dateFrom!: Date;
}