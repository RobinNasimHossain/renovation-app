import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold text-center">Sign in</h1>
      <p className="mt-2 text-stone-600 text-center text-sm">
        Admin users can manage services, projects, and bookings.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 card p-6 space-y-4">
        <div>
          <label className="field-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="field-input"
            placeholder="admin@renovation.local"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="field-input"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="rounded-md bg-red-50 text-red-800 text-sm px-3 py-2">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-stone-600">
        Seed credentials: <code className="text-brand-700">admin@renovation.local</code> /{' '}
        <code className="text-brand-700">admin1234</code>
      </p>
      <p className="mt-2 text-center text-xs text-stone-500">
        <Link to="/" className="hover:text-brand-700">← Back home</Link>
      </p>
    </div>
  );
}
