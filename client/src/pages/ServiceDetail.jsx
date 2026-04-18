import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';
import BookingForm from '../components/BookingForm.jsx';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/services').then((r) => setServices(r.data.services)).catch(() => {});
  }, []);

  useEffect(() => {
    setError('');
    setService(null);
    api
      .get(`/services/${slug}`)
      .then((r) => setService(r.data.service))
      .catch((err) => setError(err?.response?.data?.message || 'Not found'));
  }, [slug]);

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-stone-700">{error}</p>
        <Link to="/services" className="btn-outline mt-4 inline-flex">
          Back to services
        </Link>
      </div>
    );
  }

  if (!service) {
    return <div className="mx-auto max-w-3xl px-4 py-20 text-center text-stone-500">Loading...</div>;
  }

  return (
    <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-stone-500">
        <Link to="/services" className="hover:text-brand-700">Services</Link>
        <span className="mx-2">/</span>
        <span className="capitalize">{service.category}</span>
        <span className="mx-2">/</span>
        <span className="text-stone-800">{service.title}</span>
      </nav>

      <header className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="badge bg-brand-50 text-brand-700 capitalize">{service.category}</span>
          <h1 className="mt-3 text-4xl font-bold">{service.title}</h1>
          <p className="mt-3 text-stone-700">{service.summary}</p>
          <div className="mt-6 flex gap-6 text-sm">
            <div>
              <div className="text-stone-500">Starting at</div>
              <div className="text-xl font-semibold text-brand-700">
                ${service.startingPrice.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-stone-500">Typical duration</div>
              <div className="text-xl font-semibold">{service.durationDays} days</div>
            </div>
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-stone-100 border border-stone-200">
          {service.image ? (
            <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-stone-400">No image</div>
          )}
        </div>
      </header>

      <section className="mt-12 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 prose prose-stone max-w-none">
          <h2>About this service</h2>
          <p>{service.description}</p>
          <h3>What's included</h3>
          <ul>
            <li>Permit handling and inspection coordination</li>
            <li>Design consultation and 3D renders</li>
            <li>Premium materials from trusted suppliers</li>
            <li>Daily site cleanup and safety management</li>
            <li>Fixed-price scope with itemized quote</li>
            <li>12-month workmanship warranty</li>
          </ul>
        </div>

        <aside className="card p-6 h-fit">
          <h3 className="text-lg font-semibold">Request this service</h3>
          <p className="text-sm text-stone-600 mt-1">
            Tell us a little about your project and we'll get back to you within one business day.
          </p>
          <div className="mt-4">
            <BookingForm services={services} selectedServiceId={service._id} />
          </div>
        </aside>
      </section>
    </article>
  );
}
