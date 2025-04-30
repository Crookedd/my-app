import mongoose, { Document, Schema } from 'mongoose';

export interface ITag extends Document {
  name: string;
}

const tagSchema = new Schema<ITag>({
  name: { type: String, required: true, unique: true },
});

const Tag = mongoose.model<ITag>('Tag', tagSchema);

export default Tag;
