import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  return (
    <Link to={`/services/${service.slug}`} className="card group hover:shadow-md transition">
      <div className="aspect-[4/3] overflow-hidden bg-stone-100">
        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-stone-400 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="badge bg-brand-50 text-brand-700 capitalize">{service.category}</span>
          {service.featured && (
            <span className="badge bg-amber-100 text-amber-800">Featured</span>
          )}
        </div>
        <h3 className="mt-3 text-lg font-semibold text-stone-900">{service.title}</h3>
        <p className="mt-1 text-sm text-stone-600 line-clamp-2">{service.summary}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="font-semibold text-brand-700">
            From ${service.startingPrice.toLocaleString()}
          </span>
          <span className="text-stone-500">{service.durationDays} days</span>
        </div>
      </div>
    </Link>
  );
}
