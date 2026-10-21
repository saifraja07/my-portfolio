export default function SectionHeading({ title, id }) {
  return (
    <div>
      <h2 id={id} className="text-3xl font-medium uppercase leading-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  )
}
