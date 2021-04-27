import { model, Schema, Model, Document } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IRaffleTicket extends Document {
  userId: string;
  uniqueCode: string;
}

const RaffleTicketSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  uniqueCode: { type: String, required: true, unique: true },
});

export const RaffleTicket: Model<IRaffleTicket> = model(
  'RaffleTicket',
  RaffleTicketSchema,
);
