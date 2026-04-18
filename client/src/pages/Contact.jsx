import { useEffect, useState } from 'react';
import api from '../api';
import BookingForm from '../components/BookingForm.jsx';

export default function Contact() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/services').then((r) => setServices(r.data.services)).catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-bold">Let's build something.</h1>
        <p className="mt-3 text-stone-700">
          Tell us about your project and we'll reach out within one business day to schedule a free
          on-site consultation.
        </p>
        <div className="mt-8 space-y-4 text-sm text-stone-700">
          <div>
            <div className="font-semibold">Call us</div>
            <a href="tel:+15555550123" className="hover:text-brand-700">(555) 555-0123</a>
          </div>
          <div>
            <div className="font-semibold">Email</div>
            <a href="mailto:hello@renovation.local" className="hover:text-brand-700">
              hello@renovation.local
            </a>
          </div>
          <div>
            <div className="font-semibold">Office</div>
            <p>1200 NW Lovejoy St · Portland, OR 97209</p>
          </div>
          <div>
            <div className="font-semibold">Service area</div>
            <p>Portland metro, Vancouver WA, Salem, Bend, and surrounding areas.</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 card p-6 md:p-8">
        <BookingForm services={services} />
      </div>
    </div>
  );
}
