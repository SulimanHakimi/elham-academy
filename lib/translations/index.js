import * as faGeneral from './fa-general';
import faCourses from './fa-courses';
import faPosts from './fa-posts';

/** Dari content overlays, grouped by entity. */
export const fa = {
  site: faGeneral.site,
  stats: faGeneral.stats,
  categories: faGeneral.categories,
  instructors: faGeneral.instructors,
  plans: faGeneral.plans,
  testimonials: faGeneral.testimonials,
  faqs: faGeneral.faqs,
  features: faGeneral.features,
  whyFeatures: faGeneral.whyFeatures,
  aboutFeatures: faGeneral.aboutFeatures,
  values: faGeneral.values,
  milestones: faGeneral.milestones,
  instructorPerks: faGeneral.instructorPerks,
  supportWays: faGeneral.supportWays,
  contactChannels: faGeneral.contactChannels,
  courses: faCourses,
  posts: faPosts,
};

const bundles = { fa };

/** Returns the overlay bundle for a locale, or null when none exists (English). */
export function getTranslations(lang) {
  return bundles[lang] || null;
}

export default getTranslations;
