import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Blog } from './pages/Blog'
import { Experiment } from './pages/Experiment'
import { Experiments } from './pages/Experiments'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { WorkExperience } from './pages/WorkExperience'
import { ThemeProvider } from './theme/ThemeContext'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experiments" element={<Experiments />} />
            <Route path="/experiments/:slug" element={<Experiment />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<WorkExperience />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}
