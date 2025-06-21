import Enrollment, { EnrollmentDocument } from '../models/enrollment';

export const enrollmentRepository = {
  async findByUserAndCourse(userId: string, courseId: string): Promise<EnrollmentDocument | null> {
    return await Enrollment.findOne({ user: userId, course: courseId });
  },

  async create(userId: string, courseId: string): Promise<EnrollmentDocument> {
    const enrollment = new Enrollment({ user: userId, course: courseId });
    return await enrollment.save();
  },

  async updateProgress(enrollmentId: string, completedLessons: string[], progress: number) {
    return await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { completedLessons, progress },
      { new: true }
    );
  },

  async addCompletedLesson(userId: string, courseId: string, lessonId: string) {
    return await Enrollment.findOneAndUpdate(
      { user: userId, course: courseId },
      { $addToSet: { completedLessons: lessonId } },
      { new: true }
    );
  },

  async removeCompletedLesson(userId: string, courseId: string, lessonId: string) {
    return await Enrollment.findOneAndUpdate(
      { user: userId, course: courseId },
      { $pull: { completedLessons: lessonId } },
      { new: true }
    );
  },

  async countEnrollments(courseId: string): Promise<number> {
    return await Enrollment.countDocuments({ course: courseId });
  }
};
