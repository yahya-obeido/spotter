import spotPins from '../assets/SpotPins.png'

const FEATURES = [
  'Responsive navigation that swaps between info, input, and output experiences.',
  'Guided address collection with reusable icon-backed form tiles for every route stop.',
  'Cycle hour input that guards against invalid entries before hitting the API.',
  'Submission wiring to the `/api/process` endpoint with optimistic UI feedback.',
  'Output preview panes ready to render backend HTML and generated imagery.',
]

const FUTURE_WORK = [
  'Connect real routing intelligence and visualize paths on an interactive map.',
  'Add persisted auth sessions so fleets can revisit prior quotes.',
  'Enhance validation with city/state lookups plus clearer inline guidance.',
  'Surface API result history and allow exporting to PDF for dispatch teams.',
  'Expand automated tests to cover submission flows and error boundaries.',
]

function InfoSection() {
  return (
    <section className="info-section">
      <img src={spotPins} alt="Spot pins" className="info-hero-image" />
      <p className="info-intro">
        Hi! I&apos;m Yahya Obeido and this is my assessment for SpotterAI Full Stack position.
      </p>
      <div className="info-block">
        <h3>Key Features</h3>
        <ul>
          {FEATURES.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="info-block">
        <h3>Future Work &amp; Improvements</h3>
        <ul>
          {FUTURE_WORK.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default InfoSection

