import { model, Schema, Model, Document } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IUserContestMappingSchema extends Document {
	userId: string;
	contestId: string;
	ticketId: string;
}

const UserContestMappingSchema: Schema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	contestId: { type: Schema.Types.ObjectId, required: true },
	ticketId: { type: Schema.Types.ObjectId, required: true },
});

export const UserContestMapping: Model<IUserContestMappingSchema> = model(
	'UserContestMapping',
	UserContestMappingSchema,
);
