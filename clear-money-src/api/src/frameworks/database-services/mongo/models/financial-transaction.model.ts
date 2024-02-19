import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.model';
import { Category } from './category.model';
import FinancialType from '@/core/enums/financial-type.enum';

@Schema()
export class FinancialTransaction {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  description: string;

  @Prop({ enum: FinancialType, required: true })
  type: FinancialType;

  @Prop({ type: Types.ObjectId, ref:'Category' })
  category: Category;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export type FinancialTransactionDocument = FinancialTransaction & Document;

export const FinancialTransactionSchema = SchemaFactory.createForClass(FinancialTransaction);
