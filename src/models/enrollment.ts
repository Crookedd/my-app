import { Schema, model, Document, Types } from 'mongoose';

export interface IEnrollment extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
  enrolledAt: Date;
}

const enrollmentSchema = new Schema<IEnrollment>({
  user: { type: Schema.Types.ObjectId, ref: 'Пользователь', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Курс', required: true },
  enrolledAt: { type: Date, default: Date.now },
});

const Enrollment = model<IEnrollment>('Запись', enrollmentSchema);
export default Enrollment;
