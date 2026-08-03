import mongoose from 'mongoose';

const InstructorSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    role: String,
    bio: String,
    location: String,
    courses: { type: Number, default: 0 },
    learners: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Instructor || mongoose.model('Instructor', InstructorSchema);
