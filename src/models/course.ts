import mongoose, { Document, Schema } from 'mongoose';
import slugify from 'slugify';


export interface ICourse extends Document {
    title: string;
    slug: string;
    description?: string;
    price: number;
    image: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    published: boolean;
    author: string;
    createdAt: Date;
  }
  
  const courseSchema = new Schema<ICourse>({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner', required: true },
    published: { type: Boolean, default: false },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
  });
  
  courseSchema.pre('validate', function (next) {
    if (this.isModified('title') || !this.slug) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
  });
  
  const Course = mongoose.model<ICourse>('Курс', courseSchema);
  
  export default Course;