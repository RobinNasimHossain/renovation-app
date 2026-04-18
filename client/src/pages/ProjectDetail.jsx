import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setProject(null);
    api
      .get(`/projects/${slug}`)
      .then((r) => setProject(r.data.project))
      .catch((err) => setError(err?.response?.data?.message || 'Not found'));
  }, [slug]);

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-stone-700">{error}</p>
        <Link to="/projects" className="btn-outline mt-4 inline-flex">
          Back to portfolio
        </Link>
      </div>
    );
  }

  if (!project) {
    return <div className="mx-auto max-w-3xl px-4 py-20 text-center text-stone-500">Loading...</div>;
  }

  const images = [project.coverImage, ...(project.gallery || [])].filter(Boolean);

  return (
    <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-stone-500">
        <Link to="/projects" className="hover:text-brand-700">Portfolio</Link>
        <span className="mx-2">/</span>
        <span className="text-stone-800">{project.title}</span>
      </nav>

      <header className="mt-6">
        <span className="badge bg-stone-100 text-stone-700 capitalize">{project.category}</span>
        <h1 className="mt-3 text-4xl font-bold">{project.title}</h1>
        <div className="mt-2 text-stone-500 text-sm">
          {project.location || '—'} · Completed {new Date(project.completedAt).toLocaleDateString()}
        </div>
      </header>

      {images[0] && (
        <img
          src={images[0]}
          alt={project.title}
          className="mt-8 w-full rounded-xl object-cover max-h-[520px]"
        />
      )}

      <section className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold">About the project</h2>
          <p className="mt-3 text-stone-700 whitespace-pre-line">{project.description}</p>
        </div>
        <aside className="card p-6 h-fit">
          <h3 className="font-semibold">Project facts</h3>
          <dl className="mt-3 text-sm divide-y divide-stone-200">
            <div className="py-2 flex justify-between">
              <dt className="text-stone-500">Location</dt>
              <dd>{project.location || '—'}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-stone-500">Category</dt>
              <dd className="capitalize">{project.category}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-stone-500">Budget</dt>
              <dd>{project.budget ? `$${project.budget.toLocaleString()}` : '—'}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-stone-500">Completed</dt>
              <dd>{new Date(project.completedAt).toLocaleDateString()}</dd>
            </div>
          </dl>
          <Link to="/contact" className="btn-primary mt-6 w-full">
            Start a similar project
          </Link>
        </aside>
      </section>

      {images.length > 1 && (
        <section className="mt-14">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.slice(1).map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className="w-full rounded-xl object-cover aspect-[4/3]"
                loading="lazy"
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
