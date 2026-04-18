require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Service = require('./models/Service');
const Project = require('./models/Project');
const Booking = require('./models/Booking');

const services = [
  {
    slug: 'kitchen-remodel',
    title: 'Kitchen Remodel',
    category: 'kitchen',
    summary: 'Modern, functional kitchens designed around how you cook and gather.',
    description:
      'Custom cabinetry, quartz countertops, energy-efficient appliances, and smart lighting. Turnkey design-to-install service with a dedicated project manager.',
    startingPrice: 15000,
    durationDays: 21,
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80&auto=format&fit=crop',
    featured: true,
  },
  {
    slug: 'bathroom-renovation',
    title: 'Bathroom Renovation',
    category: 'bathroom',
    summary: 'Spa-like bathrooms with premium tile, fixtures, and waterproofing.',
    description:
      'From full gut renovations to refreshes — frameless glass, walk-in showers, radiant heated floors, and smart ventilation.',
    startingPrice: 9000,
    durationDays: 14,
    image:
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80&auto=format&fit=crop',
    featured: true,
  },
  {
    slug: 'flooring-installation',
    title: 'Flooring Installation',
    category: 'flooring',
    summary: 'Hardwood, engineered, luxury vinyl, and tile — installed to last.',
    description:
      'Subfloor prep, moisture testing, and certified installers. We handle removal, disposal, and trim work so you only see the finished result.',
    startingPrice: 4000,
    durationDays: 5,
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop',
    featured: false,
  },
  {
    slug: 'interior-painting',
    title: 'Interior Painting',
    category: 'painting',
    summary: 'Premium paints, clean lines, and zero mess — guaranteed.',
    description:
      'Two-coat application with premium low-VOC paints. Color consultation, drywall patching, and trim work included.',
    startingPrice: 1800,
    durationDays: 3,
    image:
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&q=80&auto=format&fit=crop',
    featured: false,
  },
  {
    slug: 'roof-replacement',
    title: 'Roof Replacement',
    category: 'roofing',
    summary: 'Architectural shingles with manufacturer-backed warranties.',
    description:
      'Full tear-off, ice & water shield, synthetic underlayment, and GAF/CertainTeed shingles. 25-year workmanship warranty.',
    startingPrice: 12000,
    durationDays: 3,
    image:
      'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=1200&q=80&auto=format&fit=crop',
    featured: true,
  },
  {
    slug: 'deck-and-patio',
    title: 'Deck & Patio',
    category: 'exterior',
    summary: 'Outdoor living spaces built from composite, cedar, or stone.',
    description:
      'Permit handling, structural engineering, railings, lighting, and built-in benches. Designed for year-round enjoyment.',
    startingPrice: 7500,
    durationDays: 10,
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80&auto=format&fit=crop',
    featured: false,
  },
];

const projects = [
  {
    slug: 'oakwood-kitchen',
    title: 'Oakwood Kitchen Transformation',
    location: 'Portland, OR',
    category: 'kitchen',
    summary:
      'A closed-off 90s kitchen reopened into a bright, open-plan hub with a large quartz island.',
    description:
      'Removed a load-bearing wall, installed an LVL beam, and opened the kitchen to the dining space. Custom shaker cabinets in warm oak, matte black hardware, and integrated appliances.',
    coverImage:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fe6ba63?w=1200&q=80&auto=format&fit=crop',
    ],
    budget: 48000,
    completedAt: new Date('2024-11-12'),
  },
  {
    slug: 'riverside-master-bath',
    title: 'Riverside Master Bath',
    location: 'Seattle, WA',
    category: 'bathroom',
    summary: 'Heated marble floors, frameless glass, and a freestanding soaker tub.',
    description:
      'Full gut renovation with new plumbing rough-in, radiant heated floors, custom vanity with integrated LED mirrors, and a zero-entry walk-in shower.',
    coverImage:
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80&auto=format&fit=crop',
    ],
    budget: 32000,
    completedAt: new Date('2024-09-22'),
  },
  {
    slug: 'craftsman-exterior',
    title: 'Craftsman Exterior Refresh',
    location: 'Tacoma, WA',
    category: 'exterior',
    summary: 'New cedar siding accents, architectural shingles, and a wrap-around porch.',
    description:
      'Replaced aging wood siding with fiber cement, added cedar accents, re-roofed with GAF Timberline HDZ, and rebuilt the front porch with composite decking.',
    coverImage:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80&auto=format&fit=crop',
    gallery: [],
    budget: 62000,
    completedAt: new Date('2024-07-02'),
  },
  {
    slug: 'studio-flooring',
    title: 'Art Studio Hardwood Install',
    location: 'Bend, OR',
    category: 'flooring',
    summary: 'Wide-plank white oak with a matte hardwax-oil finish.',
    description:
      'Level subfloor prep, moisture testing, and a custom 7" white-oak installation finished with Rubio Monocoat for a natural matte look.',
    coverImage:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop',
    gallery: [],
    budget: 14000,
    completedAt: new Date('2024-05-18'),
  },
];

async function run() {
  await connectDB();
  console.log('[seed] clearing existing data...');
  await Promise.all([
    User.deleteMany({}),
    Service.deleteMany({}),
    Project.deleteMany({}),
    Booking.deleteMany({}),
  ]);

  console.log('[seed] creating admin and sample user...');
  await User.create({
    name: 'Admin',
    email: 'admin@renovation.local',
    password: 'admin1234',
    role: 'admin',
  });
  await User.create({
    name: 'Sample User',
    email: 'user@renovation.local',
    password: 'user1234',
    role: 'user',
  });

  console.log('[seed] inserting services and projects...');
  await Service.insertMany(services);
  await Project.insertMany(projects);

  console.log('[seed] done');
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error('[seed] failed', err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
