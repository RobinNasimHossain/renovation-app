import { useState } from 'react';
import api from '../api';

const defaultForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  service: '',
  preferredDate: '',
  budget: '',
  message: '',
};

export default function BookingForm({ services = [], selectedServiceId = '' }) {
  const [form, setForm] = useState({ ...defaultForm, service: selectedServiceId });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'submitting', message: '' });
    try {
      const payload = {
        ...form,
        budget: form.budget ? Number(form.budget) : undefined,
        preferredDate: form.preferredDate || undefined,
        service: form.service || undefined,
      };
      await api.post('/bookings', payload);
      setStatus({
        state: 'success',
        message: "Thanks! We've received your request and will reach out within one business day.",
      });
      setForm({ ...defaultForm });
    } catch (err) {
      setStatus({
        state: 'error',
        message: err?.response?.data?.message || 'Something went wrong. Please try again.',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="field-input"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="field-input"
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="field-input"
            placeholder="(555) 555-0123"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="address">Project address</label>
          <input
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="field-input"
            placeholder="1200 NW Lovejoy St, Portland, OR"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="service">Service</label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className="field-input"
          >
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="preferredDate">Preferred start date</label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            value={form.preferredDate}
            onChange={handleChange}
            className="field-input"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="budget">Budget (USD)</label>
          <input
            id="budget"
            name="budget"
            type="number"
            min="0"
            value={form.budget}
            onChange={handleChange}
            className="field-input"
            placeholder="15000"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="message">Tell us about your project</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            className="field-input"
            placeholder="Scope, materials you like, timeline, anything else we should know..."
          />
        </div>
      </div>

      {status.state === 'success' && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{status.message}</p>
      )}
      {status.state === 'error' && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-800">{status.message}</p>
      )}

      <button
        type="submit"
        disabled={status.state === 'submitting'}
        className="btn-primary w-full sm:w-auto disabled:opacity-60"
      >
        {status.state === 'submitting' ? 'Sending...' : 'Request quote'}
      </button>
    </form>
  );
}
