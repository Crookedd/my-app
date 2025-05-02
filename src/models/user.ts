import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
  favorites: { courseId: string; courseTitle: string }[]; 
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  favorites: { type: [{ courseId: String, courseTitle: String }], default: [] },
});

const User = mongoose.model<IUser>('Пользователь', userSchema);

export default User;
