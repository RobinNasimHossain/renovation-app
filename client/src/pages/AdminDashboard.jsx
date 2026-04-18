import { useEffect, useState } from 'react';
import api from '../api';

const statusColors = {
  pending: 'bg-amber-100 text-amber-800',
  contacted: 'bg-sky-100 text-sky-800',
  scheduled: 'bg-indigo-100 text-indigo-800',
  completed: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-stone-200 text-stone-700',
};

const statuses = ['pending', 'contacted', 'scheduled', 'completed', 'cancelled'];

export default function AdminDashboard() {
  const [tab, setTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function refresh() {
    setLoading(true);
    setError('');
    try {
      const [b, s, p] = await Promise.all([
        api.get('/bookings'),
        api.get('/services'),
        api.get('/projects'),
      ]);
      setBookings(b.data.bookings);
      setServices(s.data.services);
      setProjects(p.data.projects);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function updateStatus(id, status) {
    try {
      await api.patch(`/bookings/${id}`, { status });
      refresh();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update booking status');
    }
  }

  async function deleteBooking(id) {
    if (!confirm('Delete this booking?')) return;
    try {
      await api.delete(`/bookings/${id}`);
      refresh();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete booking');
    }
  }

  async function deleteService(id) {
    if (!confirm('Delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      refresh();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete service');
    }
  }

  async function deleteProject(id) {
    if (!confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      refresh();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete project');
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-1 text-stone-600 text-sm">
            Manage bookings, services, and portfolio projects.
          </p>
        </div>
        <button onClick={refresh} className="btn-outline" disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </header>

      <nav className="mt-6 border-b border-stone-200 flex gap-2 overflow-x-auto">
        {['bookings', 'services', 'projects'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 -mb-px ${
              tab === t
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            {t}{' '}
            <span className="ml-1 text-xs text-stone-400">
              ({t === 'bookings' ? bookings.length : t === 'services' ? services.length : projects.length})
            </span>
          </button>
        ))}
      </nav>

      {error && <p className="mt-4 rounded-md bg-red-50 text-red-800 text-sm px-3 py-2">{error}</p>}

      <section className="mt-6">
        {tab === 'bookings' && (
          <div className="overflow-x-auto card">
            <table className="min-w-full text-sm">
              <thead className="bg-stone-50 text-stone-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Created</th>
                  <th className="px-4 py-3 text-left">Client</th>
                  <th className="px-4 py-3 text-left">Service</th>
                  <th className="px-4 py-3 text-left">Budget</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td className="px-4 py-3 text-stone-500 whitespace-nowrap">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{b.name}</div>
                      <div className="text-stone-500 text-xs">{b.email}</div>
                      {b.phone && <div className="text-stone-500 text-xs">{b.phone}</div>}
                    </td>
                    <td className="px-4 py-3">{b.serviceTitle || b.service?.title || '—'}</td>
                    <td className="px-4 py-3">{b.budget ? `$${b.budget.toLocaleString()}` : '—'}</td>
                    <td className="px-4 py-3">
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b._id, e.target.value)}
                        className={`rounded-full px-2 py-1 text-xs font-medium border-0 ${statusColors[b.status] || ''}`}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => deleteBooking(b._id)}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-stone-500">
                      No bookings yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'services' && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s._id} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-stone-500 uppercase">{s.category}</div>
                    <h3 className="mt-1 font-semibold">{s.title}</h3>
                  </div>
                  <button
                    onClick={() => deleteService(s._id)}
                    className="text-red-600 text-xs hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
                <p className="mt-2 text-sm text-stone-600 line-clamp-3">{s.summary}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
                  <span>From ${s.startingPrice.toLocaleString()}</span>
                  <span>{s.durationDays} days</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'projects' && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <div key={p._id} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-stone-500 uppercase">{p.category}</div>
                    <h3 className="mt-1 font-semibold">{p.title}</h3>
                  </div>
                  <button
                    onClick={() => deleteProject(p._id)}
                    className="text-red-600 text-xs hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
                <p className="mt-2 text-sm text-stone-600 line-clamp-3">{p.summary}</p>
                <div className="mt-3 text-xs text-stone-500">
                  {p.location} · {new Date(p.completedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
