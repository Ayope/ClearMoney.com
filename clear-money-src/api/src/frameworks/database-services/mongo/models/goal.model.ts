import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.model';
import SavingFrequency from '@/core/enums/savingFrequency.enum';

@Schema()
export class Goal {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  targeted_amount: number;

  @Prop({ default: 0 })
  current_amount: number;

  @Prop({ default: 0 })
  saving_amount: number;

  @Prop({ enum: SavingFrequency, default: SavingFrequency.Monthly, required: true })
  saving_frequency: SavingFrequency;

  @Prop({ required : true })
  targeted_date: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export type GoalDocument = Goal & Document;

export const GoalSchema = SchemaFactory.createForClass(Goal);
