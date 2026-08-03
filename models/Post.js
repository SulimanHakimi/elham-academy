import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: String,
    author: String,
    date: String,
    readTime: Number,
    featured: { type: Boolean, default: false },
    accent: { type: String, default: 'brand' },
    icon: String,
    excerpt: String,
    body: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
