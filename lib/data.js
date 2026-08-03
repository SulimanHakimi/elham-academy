import { connectWithTimeout } from './mongodb';
import Course from '@/models/Course';
import Category from '@/models/Category';
import Instructor from '@/models/Instructor';
import Post from '@/models/Post';
import Plan from '@/models/Plan';
import Testimonial from '@/models/Testimonial';
import Faq from '@/models/Faq';
import * as content from './seed-data';
import {
  localize,
  localizeAll,
  localizeFaqs,
  localizeKeyed,
  localizeStats,
  localizeSupportWays,
  localizeContactChannels,
  localizeSite,
  localizeStrings,
} from './localize';

/**
 * Circuit breaker. Without it, a page that makes several queries would wait for
 * the driver's selection timeout on every single one while the database is down,
 * turning a fast fallback into a slow page. After a failure we serve bundled
 * content immediately for a short cooldown, then try the database again.
 */
const COOLDOWN_MS = 20_000;
let downUntil = 0;

/**
 * Every read goes through `fromDb`: it tries MongoDB first and falls back to the
 * bundled content in `lib/seed-data.js` when the database is unreachable or
 * empty. That keeps the site fully renderable before `npm run seed` has been run
 * and during a database outage.
 */
async function fromDb(query, fallback) {
  if (Date.now() < downUntil) return fallback;

  try {
    await connectWithTimeout(5000);
    const result = await query();
    downUntil = 0;
    const empty = Array.isArray(result) ? result.length === 0 : !result;
    if (empty) return fallback;
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    const firstFailure = downUntil === 0;
    downUntil = Date.now() + COOLDOWN_MS;
    if (firstFailure) {
      console.warn(
        `[data] MongoDB unavailable, serving bundled content for the next ${
          COOLDOWN_MS / 1000
        }s: ${error.message.split('\n')[0]}`
      );
    }
    return fallback;
  }
}

/* ------------------------------------------------------------------ courses */

export async function getCourses({ category, limit, featured, popular, lang } = {}) {
  const filter = {};
  if (category && category !== 'all') filter.category = category;
  if (featured) filter.featured = true;
  if (popular) filter.popular = true;

  const fallback = content.courses
    .filter((c) => (category && category !== 'all' ? c.category === category : true))
    .filter((c) => (featured ? c.featured : true))
    .filter((c) => (popular ? c.popular : true))
    .slice(0, limit || undefined);

  const courses = await fromDb(async () => {
    let q = Course.find(filter).sort({ featured: -1, students: -1 }).lean();
    if (limit) q = q.limit(limit);
    return q;
  }, fallback);

  return localizeAll('course', courses, lang);
}

export async function getCourse(slug, lang) {
  const fallback = content.courses.find((c) => c.slug === slug) || null;
  const course = await fromDb(() => Course.findOne({ slug }).lean(), fallback);
  return localize('course', course, lang);
}

export async function getCourseSlugs() {
  const courses = await getCourses();
  return courses.map((c) => c.slug);
}

export async function getRelatedCourses(course, limit = 3, lang) {
  if (!course) return [];
  const all = await getCourses({ lang });

  const sameCategory = all.filter(
    (c) => c.category === course.category && c.slug !== course.slug
  );
  const others = all.filter((c) => c.category !== course.category && c.slug !== course.slug);

  return [...sameCategory, ...others].slice(0, limit);
}

/* --------------------------------------------------------------- categories */

export async function getCategories(lang) {
  const categories = await fromDb(() => Category.find({}).lean(), content.categories);
  return localizeAll('category', categories, lang);
}

/* -------------------------------------------------------------- instructors */

export async function getInstructors(limit, lang) {
  const instructors = await fromDb(
    async () => {
      let q = Instructor.find({}).sort({ learners: -1 }).lean();
      if (limit) q = q.limit(limit);
      return q;
    },
    limit ? content.instructors.slice(0, limit) : content.instructors
  );

  return localizeAll('instructor', instructors, lang);
}

export async function getInstructor(slug, lang) {
  const fallback = content.instructors.find((i) => i.slug === slug) || null;
  const instructor = await fromDb(() => Instructor.findOne({ slug }).lean(), fallback);
  return localize('instructor', instructor, lang);
}

/* --------------------------------------------------------------------- blog */

export async function getPosts({ limit, lang } = {}) {
  const sorted = [...content.posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  const posts = await fromDb(
    async () => {
      let q = Post.find({}).sort({ date: -1 }).lean();
      if (limit) q = q.limit(limit);
      return q;
    },
    limit ? sorted.slice(0, limit) : sorted
  );

  return localizeAll('post', posts, lang);
}

export async function getPost(slug, lang) {
  const fallback = content.posts.find((p) => p.slug === slug) || null;
  const post = await fromDb(() => Post.findOne({ slug }).lean(), fallback);
  return localize('post', post, lang);
}

export async function getPostSlugs() {
  const posts = await getPosts();
  return posts.map((p) => p.slug);
}

/* ------------------------------------------------------- plans & social proof */

export async function getPlans(lang) {
  const plans = await fromDb(() => Plan.find({}).lean(), content.plans);
  return localizeAll('plan', plans, lang);
}

export async function getTestimonials(limit, lang) {
  const testimonials = await fromDb(
    async () => {
      let q = Testimonial.find({}).lean();
      if (limit) q = q.limit(limit);
      return q;
    },
    limit ? content.testimonials.slice(0, limit) : content.testimonials
  );

  return localizeAll('testimonial', testimonials, lang);
}

export async function getFaqs(limit, lang) {
  const faqs = await fromDb(
    async () => {
      let q = Faq.find({}).sort({ order: 1 }).lean();
      if (limit) q = q.limit(limit);
      return q;
    },
    limit ? content.faqs.slice(0, limit) : content.faqs
  );

  return localizeFaqs(faqs, lang);
}

/* ------------------------------------------------------------ static content */

/**
 * Content that has no collection of its own. Returned through functions rather
 * than plain exports because each needs the active locale.
 */
export function getSite(lang) {
  return localizeSite(content.site, lang);
}

export function getStats(lang) {
  return localizeStats(content.stats, lang);
}

export function getFeatures(lang) {
  return localizeKeyed('features', content.features, lang);
}

export function getWhyFeatures(lang) {
  return localizeKeyed('whyFeatures', content.whyFeatures, lang);
}

export function getAboutFeatures(lang) {
  return localizeKeyed('aboutFeatures', content.aboutFeatures, lang);
}

export function getValues(lang) {
  return localizeKeyed('values', content.values, lang);
}

export function getMilestones(lang) {
  return localizeKeyed('milestones', content.milestones, lang, 'year');
}

export function getInstructorPerks(lang) {
  return localizeStrings('instructorPerks', content.instructorPerks, lang);
}

export function getSupportWays(lang) {
  return localizeSupportWays(content.supportWays, lang);
}

export function getContactChannels(lang) {
  return localizeContactChannels(content.contactChannels, lang);
}

/** The About Us blocks are authored bilingually in `lib/seed-data.js`. */
export const about = content.about;

/** Kept for non-localized use (metadata defaults, the seed script, API routes). */
export const site = content.site;
