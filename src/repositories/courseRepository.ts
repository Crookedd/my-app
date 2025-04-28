import Course, { ICourse } from '../models/course';

interface CourseFilters {
  title?: string;
  category?: string;
  level?: string;
  published?: boolean;
}

export const courseRepository = {
  async findAll(filters: CourseFilters, page = 1, limit = 10) {
    const query: any = {};

    if (filters.title) {
      query.title = { $regex: filters.title, $options: 'i' }; 
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.level) {
      query.level = filters.level;
    }

    if (typeof filters.published !== 'undefined') {
      query.published = filters.published;
    }

    const courses = await Course.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); 

    const total = await Course.countDocuments(query);

    return { courses, total };
  },

  async findById(id: string) {
    return await Course.findById(id);
  },

  async create(courseData: Partial<ICourse>) {
    const course = new Course(courseData);
    await course.save();
    return course;
  },

  async updateById(id: string, courseData: Partial<ICourse>) {
    return await Course.findByIdAndUpdate(id, courseData, { new: true });
  },

  async deleteById(id: string) {
    return await Course.findByIdAndDelete(id);
  },
};
