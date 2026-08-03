import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema(
  {
    courseSlug: { type: String, required: true, index: true },
    courseTitle: String,
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    province: String,
    plan: String,
    note: String,
    status: {
      type: String,
      enum: ['pending', 'contacted', 'active', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);
