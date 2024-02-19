import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from './category.model';
import { User } from './user.model';

@Schema()
export class DailyExpense {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: Types.ObjectId, ref:'Category'})
  category: Category;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export type DailyExpenseDocument = DailyExpense & Document;

export const DailyExpenseSchema = SchemaFactory.createForClass(DailyExpense);
