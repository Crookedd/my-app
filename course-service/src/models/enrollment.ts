import mongoose, { Schema, Document } from 'mongoose';

export interface EnrollmentDocument extends Document {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  completedLessons: mongoose.Types.ObjectId[];
  progress: number;
}

const EnrollmentSchema: Schema<EnrollmentDocument> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Пользователь', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    completedLessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    progress: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.model<EnrollmentDocument>('Enrollment', EnrollmentSchema);
export default Enrollment;
