import { useState } from 'react'
import Navbar from './components/Navbar'
import AnalyzerPage from './pages/AnalyzerPage'
import SnippetsPage from './pages/SnippetsPage'
import CollaboratePage from './pages/CollaboratePage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('analyzer')

  const renderPage = () => {
    switch (currentPage) {
      case 'analyzer':
        return <AnalyzerPage />
      case 'snippets':
        return <SnippetsPage />
      case 'collaborate':
        return <CollaboratePage />
      default:
        return <AnalyzerPage />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
    </div>
  )
}

export default App
