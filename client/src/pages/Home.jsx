import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import ServiceCard from '../components/ServiceCard.jsx';
import ProjectCard from '../components/ProjectCard.jsx';

const stats = [
  { label: 'Projects completed', value: '320+' },
  { label: 'Average rating', value: '4.9/5' },
  { label: 'Years in business', value: '18' },
  { label: 'Licensed & insured', value: 'Yes' },
];

const steps = [
  {
    title: 'Consult',
    text: 'Free on-site walkthrough. We measure, listen, and scope the work with you.',
  },
  {
    title: 'Design',
    text: '3D renders, material palettes, and a fixed-price scope you approve before anything starts.',
  },
  {
    title: 'Build',
    text: 'Dedicated project manager, daily cleanup, and regular check-ins until we hand you the keys.',
  },
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/services', { params: { featured: true } }).then((r) => setServices(r.data.services)).catch(() => {});
    api.get('/projects').then((r) => setProjects(r.data.projects.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-90"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=80&auto=format&fit=crop")',
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-stone-900/80 via-stone-900/60 to-stone-900/20" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-white">
          <span className="badge bg-white/10 text-white backdrop-blur ring-1 ring-white/20">
            Design · Build · Renovate
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
            Renovations that turn houses into the home you actually want.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-100">
            Kitchens, baths, full remodels, and everything in between — handled by a team that treats
            your home like their own.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              Book a free consultation
            </Link>
            <Link
              to="/projects"
              className="btn border border-white/40 text-white hover:bg-white/10"
            >
              View our portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-xl bg-white shadow-md border border-stone-200 p-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-brand-700">
                {s.value}
              </div>
              <div className="text-xs md:text-sm text-stone-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Featured services</h2>
            <p className="mt-2 text-stone-600 max-w-2xl">
              Fixed-price scopes with a single point of contact. Pick a service to see what's included.
            </p>
          </div>
          <Link to="/services" className="hidden sm:inline-flex btn-outline">
            All services
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s._id} service={s} />
          ))}
          {services.length === 0 && (
            <div className="col-span-full text-center text-stone-500 py-12">
              Services will appear here once the backend is seeded.
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="bg-stone-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-center">How it works</h2>
          <p className="mt-2 text-stone-600 text-center max-w-2xl mx-auto">
            Three simple phases. Clear pricing, clean sites, and a finish date you can actually
            count on.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="card p-6">
                <div className="h-10 w-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-semibold">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-stone-600 text-sm">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Recent projects</h2>
            <p className="mt-2 text-stone-600 max-w-2xl">
              A glimpse of some of our favorite renovations from the last year.
            </p>
          </div>
          <Link to="/projects" className="hidden sm:inline-flex btn-outline">
            Full portfolio
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
          {projects.length === 0 && (
            <div className="col-span-full text-center text-stone-500 py-12">
              Projects will appear here once the backend is seeded.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-2xl bg-brand-700 text-white p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold">Ready to start your project?</h2>
            <p className="mt-2 text-brand-100 max-w-xl">
              Tell us about your space. We'll schedule a free on-site consultation within 48 hours.
            </p>
          </div>
          <Link to="/contact" className="btn bg-white text-brand-700 hover:bg-brand-50">
            Request a quote
          </Link>
        </div>
      </section>
    </div>
  );
}
