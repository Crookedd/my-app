import Comment, { IComment } from '../models/comment';

export const commentRepository = {
  async findByLesson(lessonId: string) {
    return await Comment.find({ lesson: lessonId }).populate('user', 'username').sort({ createdAt: -1 });
  },

  async create(data: Partial<IComment>) {
    const comment = new Comment(data);
    await comment.save();
    return comment.populate('user', 'username');
  },

  async updateById(id: string, data: Partial<IComment>) {
    return await Comment.findByIdAndUpdate(id, data, { new: true }).populate('user', 'username');
  },

  async deleteById(id: string) {
    return await Comment.findByIdAndDelete(id);
  }
};
