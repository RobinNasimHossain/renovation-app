import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="card group hover:shadow-md transition">
      <div className="aspect-[16/10] overflow-hidden bg-stone-100">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
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
        <span className="badge bg-stone-100 text-stone-700 capitalize">{project.category}</span>
        <h3 className="mt-3 text-lg font-semibold text-stone-900">{project.title}</h3>
        <p className="mt-1 text-sm text-stone-600 line-clamp-2">{project.summary}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
          <span>{project.location || '—'}</span>
          <span>{new Date(project.completedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}
