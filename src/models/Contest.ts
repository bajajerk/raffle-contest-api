import { model, Schema, Model, Document } from 'mongoose';
import { WinningPrize } from '../utils/constants';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IContest extends Document {
  prize: WinningPrize;
  endDate: Date;
}

const ContestSchema: Schema = new Schema({
  prize: { type: String, enum: WinningPrize, required: true },
  endDate: { type: Date, required: true },
  winnerId: { type: String || null, default: null },
});

export const Contest: Model<IContest> = model('Contest', ContestSchema);
