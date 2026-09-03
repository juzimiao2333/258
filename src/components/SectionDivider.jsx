export default function SectionDivider({ number, label }) {
  return (
    <div className="section-divider">
      <div className="divider-line" />
      <div className="divider-marker">
        <span className="divider-number">{String(number).padStart(2, '0')}</span>
        {label && <span className="divider-label">{label}</span>}
      </div>
      <div className="divider-line" />
    </div>
  )
}
