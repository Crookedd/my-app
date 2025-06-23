import { Schema, model, Document, Types } from 'mongoose';

export interface ILesson extends Document {
  title: string;
  content?: string;
  videoUrl?: string;
  course: Types.ObjectId;
  order?: number;
  createdAt: Date;
}

const lessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  content: String,
  videoUrl: String,
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Lesson = model<ILesson>('Урок', lessonSchema);

export default Lesson;
