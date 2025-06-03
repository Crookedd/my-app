import Lesson, { ILesson } from '../models/lesson';

export const lessonRepository = {
  async findAllByCourse(courseId: string) {
    return await Lesson.find({ course: courseId }).sort({ order: 1 });
  },

  async findById(id: string) {
    return await Lesson.findById(id).populate('course');
  },

  async create(data: Partial<ILesson>) {
    const lesson = new Lesson(data);
    await lesson.save();
    return lesson;
  },

  async updateById(id: string, data: Partial<ILesson>) {
    return await Lesson.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteById(id: string) {
    return await Lesson.findByIdAndDelete(id);
  },
};
