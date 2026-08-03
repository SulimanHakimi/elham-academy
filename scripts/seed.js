/**
 * Seeds MongoDB with the content in lib/seed-data.js.
 *
 *   npm run seed
 *
 * Safe to re-run: each collection is cleared and rewritten from the same source
 * of truth the site falls back to when the database is unavailable.
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: '.env.local' });
dotenv.config();

import Course from '../models/Course.js';
import Category from '../models/Category.js';
import Instructor from '../models/Instructor.js';
import Post from '../models/Post.js';
import Plan from '../models/Plan.js';
import Testimonial from '../models/Testimonial.js';
import Faq from '../models/Faq.js';
import * as content from '../lib/seed-data.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/elham-academy';

const collections = [
  ['Courses', Course, content.courses],
  ['Categories', Category, content.categories],
  ['Instructors', Instructor, content.instructors],
  ['Posts', Post, content.posts],
  ['Plans', Plan, content.plans],
  ['Testimonials', Testimonial, content.testimonials],
  ['FAQs', Faq, content.faqs.map((faq, order) => ({ ...faq, order }))],
];

async function main() {
  const safeUri = MONGODB_URI.replace(/\/\/[^@/]*@/, '//***:***@');
  console.log(`\nElham Online Education — database seed`);
  console.log(`Connecting to ${safeUri} ...`);

  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
  console.log('Connected.\n');

  for (const [label, Model, documents] of collections) {
    await Model.deleteMany({});
    await Model.insertMany(documents);
    console.log(`  ${label.padEnd(14)} ${String(documents.length).padStart(3)} documents`);
  }

  await mongoose.disconnect();
  console.log('\nSeed complete. Run `npm run dev` and open http://localhost:3000\n');
}

main().catch(async (error) => {
  console.error(`\nSeed failed: ${error.message}`);
  if (/ECONNREFUSED|ServerSelection|querySrv/i.test(error.message)) {
    console.error(
      '\nCould not reach MongoDB. Either start a local server (mongod), or set\n' +
        'MONGODB_URI in .env.local to a MongoDB Atlas connection string.\n' +
        '\nNote: the site still renders without a database — it falls back to the\n' +
        'bundled content in lib/seed-data.js.\n'
    );
  }
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
