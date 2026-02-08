import spotteroutelogo from '../assets/SpotteRouteLogo.png'

type Page = 'info' | 'input' | 'output'

type NavigationProps = {
  currentPage: Page
  onChange: (page: Page) => void
}

const PAGES: Page[] = ['info', 'input', 'output']

function Navigation({ currentPage, onChange }: NavigationProps) {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-logo-container">
          <img src={spotteroutelogo} alt="Spotter AI Logo" className="nav-logo-image" />
        </div>
        <div className="nav-buttons">
          {PAGES.map((page) => (
            <button
              key={page}
              className={`nav-button ${currentPage === page ? 'active' : ''}`}
              onClick={() => onChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation

