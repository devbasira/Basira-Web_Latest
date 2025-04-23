import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Hero from "./components/Hero"
import Blog from "./components/Blog"
import logo from "./assets/Basira_Logo_Color.svg"
import { useNavigate } from "react-router-dom"

function AnimatedRoutes() {
  const [isExpanded, setIsExpanded] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Hero isExpanded={isExpanded} setIsExpanded={setIsExpanded} />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </AnimatePresence>

      {(location.pathname !== "/" || isExpanded) && (
        <div className="fixed bottom-[0%] bg-white lg:bg-transparent md:bg-white w-screen p-[20px] z-50">
          <motion.img
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 0.6, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ opacity: 1 }}
            onClick={() => {
              if(location.pathname === '/')
              {
                setIsExpanded(false)
              }else{
                navigate('/')
              }
            }}
            width={150}
            height={100}
            alt="Logo"
            src={logo}
            className="hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer"
          />
        </div>
      )}
    </>
  )
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen w-screen flex justify-center items-center overflow-hidden">
        <AnimatedRoutes />
      </div>
    </Router>
  )
}
