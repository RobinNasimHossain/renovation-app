import { useEffect, useMemo, useState } from 'react';
import api from '../api';
import ProjectCard from '../components/ProjectCard.jsx';

const categories = [
  'all',
  'kitchen',
  'bathroom',
  'flooring',
  'painting',
  'roofing',
  'exterior',
  'general',
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get('/projects')
      .then((r) => setProjects(r.data.projects))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (category === 'all' ? projects : projects.filter((p) => p.category === category)),
    [projects, category],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <header>
        <h1 className="text-4xl font-bold">Portfolio</h1>
        <p className="mt-2 text-stone-600 max-w-2xl">
          A selection of renovations we've completed across the Pacific Northwest.
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-sm capitalize border transition ${
              category === c
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white text-stone-700 border-stone-200 hover:border-brand-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading && <div className="col-span-full text-stone-500">Loading projects...</div>}
        {!loading && filtered.map((p) => <ProjectCard key={p._id} project={p} />)}
        {!loading && filtered.length === 0 && (
          <div className="col-span-full text-stone-500">No projects in this category yet.</div>
        )}
      </div>
    </div>
  );
}
