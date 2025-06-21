import { enrollmentRepository } from '../repositories/enrollmentRepository';
import { lessonRepository } from '../repositories/lessonRepository';

export const enrollmentService = {
  async enroll(userId: string, courseId: string) {
    const existing = await enrollmentRepository.findByUserAndCourse(userId, courseId);
    if (existing) return existing;

    return await enrollmentRepository.create(userId, courseId);
  },

async getProgress(userId: string, courseId: string) {
  const enrollment = await enrollmentRepository.findByUserAndCourse(userId, courseId);
  if (!enrollment) return null;

  const totalLessons = await lessonRepository.findAllByCourse(courseId);
  const completedCount = enrollment.completedLessons.length;
  const totalCount = totalLessons.length;

  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  if (enrollment.progress !== progress) {
    await enrollmentRepository.updateProgress(
      String(enrollment._id),
      enrollment.completedLessons.map(id => id.toString()),
      progress
    );
  }

  return {
    completed: completedCount,
    total: totalCount,
    progress
  };
},

  async completeLesson(userId: string, courseId: string, lessonId: string) {
    const updated = await enrollmentRepository.addCompletedLesson(userId, courseId, lessonId);
    if (!updated) return null;

    return await this.getProgress(userId, courseId);
  },

  async uncompleteLesson(userId: string, courseId: string, lessonId: string) {
    const updated = await enrollmentRepository.removeCompletedLesson(userId, courseId, lessonId);
    if (!updated) return null;

    return await this.getProgress(userId, courseId);
  },

  async getEnrollmentStats(courseId: string) {
    return await enrollmentRepository.countEnrollments(courseId);
  }
};
