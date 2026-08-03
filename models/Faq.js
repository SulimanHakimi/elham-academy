import mongoose from 'mongoose';

const FaqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Faq || mongoose.model('Faq', FaqSchema);
