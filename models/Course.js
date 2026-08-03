import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: Number,
    preview: { type: Boolean, default: false },
  },
  { _id: false }
);

const ModuleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: String,
    lessons: [LessonSchema],
  },
  { _id: false }
);

const IncludedSchema = new mongoose.Schema(
  { label: String, icon: String },
  { _id: false }
);

const CourseSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subtitle: String,
    category: { type: String, index: true },
    categoryName: String,
    instructor: String,
    instructorSlug: String,
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    minutes: Number,
    hours: Number,
    // Every course is free. `access` carries the label shown on the site; there
    // is no price field because nothing is sold.
    access: { type: String, default: 'Free' },
    language: String,
    type: String,
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    popular: { type: Boolean, default: false },
    accent: { type: String, default: 'brand' },
    icon: String,
    excerpt: String,
    description: String,
    requirements: [String],
    outcomes: [String],
    included: [IncludedSchema],
    curriculum: [ModuleSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
