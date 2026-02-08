import { useState } from 'react'
import './App.css'
import InfoSection from './components/InfoSection'
import InputSection from './components/InputSection'
import Navigation from './components/Navigation'
import OutputSection from './components/OutputSection'

const PAGE_TEXT = {
  info: 'Welcome to SpotteRoute!',
  input: 'Input the following information to get a quote for your trucking needs.',
  output: 'Your route has been generated. You can view it below.',
} as const

type Page = keyof typeof PAGE_TEXT

type ApiResponse = {
  html?: string
  imageUrl?: string
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('info')
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)

  const handleSubmitSuccess = (response: ApiResponse) => {
    setApiResponse(response)
    setCurrentPage('output')
  }

  return (
    <div className="App">
      <Navigation currentPage={currentPage} onChange={setCurrentPage} />
      <main className="page-content">
        <p className="page-text">{PAGE_TEXT[currentPage]}</p>
        {currentPage === 'info' && <InfoSection />}
      </main>
      {currentPage === 'input' && <InputSection onSuccess={handleSubmitSuccess} />}
      {currentPage === 'output' && <OutputSection response={apiResponse} />}
    </div>
  )
}

export default App
