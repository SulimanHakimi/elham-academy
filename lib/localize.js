import { getTranslations } from './translations';
import { normalizeLocale } from './i18n';

/**
 * Applies a Dari overlay onto an English record.
 *
 * Rules:
 *  - a field present in the overlay wins;
 *  - a field absent from the overlay keeps its English value (never blank);
 *  - arrays of plain strings are replaced wholesale;
 *  - `included` and `curriculum` are merged element-by-element so that icons,
 *    lesson durations and the free-preview flag are never duplicated into the
 *    translation files.
 */
function mergeRecord(base, overlay) {
  if (!overlay) return base;
  return { ...base, ...overlay };
}

function localizeCourse(course, overlay, bundle) {
  if (!course) return course;

  // The instructor's name is denormalized onto the course, so it is translated
  // from the instructor overlay rather than repeated in the course translations.
  const instructorName = bundle?.instructors?.[course.instructorSlug]?.name;
  if (!overlay) {
    return instructorName ? { ...course, instructor: instructorName } : course;
  }

  const merged = { ...course, ...overlay };
  if (instructorName) merged.instructor = instructorName;

  // Keep the machine-readable values that filtering depends on.
  merged.category = course.category;
  merged.level = course.level;
  merged.language = course.language;
  merged.slug = course.slug;

  if (overlay.included && Array.isArray(course.included)) {
    merged.included = course.included.map((item, i) => ({
      ...item,
      label: overlay.included[i] ?? item.label,
    }));
  }

  if (overlay.curriculum && Array.isArray(course.curriculum)) {
    merged.curriculum = course.curriculum.map((module, i) => {
      const moduleOverlay = overlay.curriculum[i];
      if (!moduleOverlay) return module;

      return {
        ...module,
        title: moduleOverlay.title ?? module.title,
        summary: moduleOverlay.summary ?? module.summary,
        lessons: (module.lessons || []).map((lesson, j) => ({
          ...lesson,
          title: moduleOverlay.lessons?.[j] ?? lesson.title,
        })),
      };
    });
  }

  return merged;
}

function localizePost(post, overlay) {
  if (!post || !overlay) {
    // Mark untranslated posts so the page can say so rather than silently
    // showing English text with no explanation.
    return post ? { ...post, translated: !overlay ? false : true } : post;
  }
  return { ...post, ...overlay, slug: post.slug, translated: true };
}

/** Localizes one entity. `kind` selects the overlay collection and merge rules. */
export function localize(kind, record, lang) {
  const locale = normalizeLocale(lang);
  const bundle = getTranslations(locale);
  if (!bundle || !record) return record;

  switch (kind) {
    case 'course':
      return localizeCourse(record, bundle.courses?.[record.slug], bundle);
    case 'post':
      return localizePost(record, bundle.posts?.[record.slug]);
    case 'category':
      return mergeRecord(record, bundle.categories?.[record.slug]);
    case 'instructor':
      return mergeRecord(record, bundle.instructors?.[record.slug]);
    case 'plan':
      return mergeRecord(record, bundle.plans?.[record.slug]);
    case 'testimonial':
      return mergeRecord(record, bundle.testimonials?.[record.name]);
    default:
      return record;
  }
}

/** Localizes a list of entities. */
export function localizeAll(kind, records, lang) {
  if (!Array.isArray(records)) return records;
  return records.map((record) => localize(kind, record, lang));
}

/** FAQs are positional — the Dari array mirrors the English one. */
export function localizeFaqs(faqs, lang) {
  const bundle = getTranslations(normalizeLocale(lang));
  if (!bundle?.faqs || !Array.isArray(faqs)) return faqs;

  return faqs.map((faq, i) => ({ ...faq, ...(bundle.faqs[i] || {}) }));
}

/**
 * Localizes the static collections that are keyed by an English label rather
 * than a slug (features, values, milestones, stats, and so on).
 */
export function localizeKeyed(collection, records, lang, key = 'title') {
  const bundle = getTranslations(normalizeLocale(lang));
  const overlays = bundle?.[collection];
  if (!overlays || !Array.isArray(records)) return records;

  return records.map((record) => {
    const overlay = overlays[record[key]];
    return overlay ? { ...record, ...overlay } : record;
  });
}

/** Stats carry their translation as a plain string keyed by the English label. */
export function localizeStats(stats, lang) {
  const bundle = getTranslations(normalizeLocale(lang));
  if (!bundle?.stats || !Array.isArray(stats)) return stats;

  return stats.map((stat) => ({ ...stat, label: bundle.stats[stat.label] ?? stat.label }));
}

/** Support ways nest an `action` object, so the label needs lifting into it. */
export function localizeSupportWays(ways, lang) {
  const bundle = getTranslations(normalizeLocale(lang));
  if (!bundle?.supportWays || !Array.isArray(ways)) return ways;

  return ways.map((way) => {
    const overlay = bundle.supportWays[way.title];
    if (!overlay) return way;

    return {
      ...way,
      title: overlay.title ?? way.title,
      description: overlay.description ?? way.description,
      action: { ...way.action, label: overlay.actionLabel ?? way.action.label },
    };
  });
}

export function localizeContactChannels(channels, lang) {
  const bundle = getTranslations(normalizeLocale(lang));
  if (!bundle?.contactChannels || !Array.isArray(channels)) return channels;

  return channels.map((channel) => {
    const overlay = bundle.contactChannels[channel.title];
    return overlay ? { ...channel, ...overlay } : channel;
  });
}

export function localizeSite(site, lang) {
  const bundle = getTranslations(normalizeLocale(lang));
  return bundle?.site ? { ...site, ...bundle.site } : site;
}

export function localizeStrings(collection, strings, lang) {
  const bundle = getTranslations(normalizeLocale(lang));
  const overlay = bundle?.[collection];
  return Array.isArray(overlay) ? overlay : strings;
}
