import Enrollment, { IEnrollment } from '../models/enrollment';
import { Types } from 'mongoose';

export const enrollmentRepository = {
  async enroll(userId: string, courseId: string): Promise<IEnrollment> {
    const enrollment = new Enrollment({
      user: new Types.ObjectId(userId),
      course: new Types.ObjectId(courseId),
    });
    return enrollment.save();
  },

  async isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
    const existing = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });
    return !!existing;
  },

  async getUserEnrollments(userId: string): Promise<IEnrollment[]> {
    return Enrollment.find({ user: userId }).populate('course');
  },

  async getCourseEnrollments(courseId: string): Promise<IEnrollment[]> {
    return Enrollment.find({ course: courseId }).populate('user');
  },

  async unenroll(userId: string, courseId: string): Promise<boolean> {
    const result = await Enrollment.deleteOne({ user: userId, course: courseId });
    return result.deletedCount === 1;
  },
};