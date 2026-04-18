const values = [
  {
    title: 'Craftsmanship',
    text: "We don't cut corners. Every miter, every tile, every seam — it either meets the standard or it gets redone.",
  },
  {
    title: 'Transparency',
    text: 'Fixed-price quotes, itemized change orders, and a shared project tracker. No surprises at invoicing time.',
  },
  {
    title: 'Respect for your home',
    text: 'Dust containment, daily cleanup, and shoe covers. Your neighbors will barely know we were there.',
  },
];

const team = [
  {
    name: 'Alex Rivera',
    role: 'Founder & General Contractor',
    image: 'https://i.pravatar.cc/240?img=12',
  },
  {
    name: 'Priya Shah',
    role: 'Lead Designer',
    image: 'https://i.pravatar.cc/240?img=47',
  },
  {
    name: 'Marcus Chen',
    role: 'Project Manager',
    image: 'https://i.pravatar.cc/240?img=33',
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold">About Renovation</h1>
      <p className="mt-4 text-stone-700 text-lg max-w-3xl">
        We're a design-build remodeling company headquartered in Portland, OR. For nearly two
        decades we've been quietly turning dated houses into spaces our clients love coming home
        to.
      </p>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="card p-6">
            <h3 className="text-lg font-semibold">{v.title}</h3>
            <p className="mt-2 text-stone-600 text-sm">{v.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold">Meet the team</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {team.map((m) => (
            <div key={m.name} className="card p-6 text-center">
              <img
                src={m.image}
                alt={m.name}
                className="mx-auto h-24 w-24 rounded-full object-cover"
              />
              <h3 className="mt-4 font-semibold">{m.name}</h3>
              <p className="text-sm text-stone-500">{m.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
