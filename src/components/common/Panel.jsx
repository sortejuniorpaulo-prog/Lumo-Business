export default function Panel({ title, description, className = '', children }) {
  return (
    <section className={`panel ${className}`.trim()}>
      {title && (
        <header className="panel-head">
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </header>
      )}
      {children}
    </section>
  )
}
