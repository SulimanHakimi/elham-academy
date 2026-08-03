import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    tagline: String,
    // Access routes, not products: `cost` is a label such as 'Free' or
    // '50% Scholarship'. No numeric price is stored anywhere.
    cost: { type: String, default: 'Free' },
    costNote: String,
    audience: String,
    cta: String,
    ctaHref: { type: String, default: '/contact' },
    featured: { type: Boolean, default: false },
    features: [String],
    notIncluded: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model('Plan', PlanSchema);
