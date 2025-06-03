import { Schema, model, Document, Types } from 'mongoose';

export interface IComment extends Document {
  content: string;
  user: Types.ObjectId;
  lesson: Types.ObjectId;
  createdAt: Date;
}

const commentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lesson: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Comment = model<IComment>('Комментарий', commentSchema);

export default Comment;