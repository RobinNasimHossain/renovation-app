import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-24 bg-stone-900 text-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white font-bold">
              R
            </span>
            <span className="font-display text-xl font-bold text-white">Renovation</span>
          </div>
          <p className="mt-4 text-sm text-stone-400">
            Design-forward home renovations, handled end-to-end by a team that cares about the
            details.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Company</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/projects" className="hover:text-white">Portfolio</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Get in touch</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-white">Request a quote</Link></li>
            <li><a href="mailto:hello@renovation.local" className="hover:text-white">hello@renovation.local</a></li>
            <li><a href="tel:+15555550123" className="hover:text-white">(555) 555-0123</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Office</h4>
          <p className="mt-3 text-sm text-stone-400">
            1200 NW Lovejoy St<br />
            Portland, OR 97209<br />
            Mon–Fri · 8:00–17:00
          </p>
        </div>
      </div>
      <div className="border-t border-stone-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Renovation App. All rights reserved.</span>
          <span>Licensed · Bonded · Insured</span>
        </div>
      </div>
    </footer>
  );
}
