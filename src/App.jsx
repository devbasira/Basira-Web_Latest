
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Hero from "./components/Hero";
import logo from './assets/Basira_Logo_Color.svg'
export default function App() {

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen w-screen flex justify-center items-center overflow-hidden">
      <AnimatePresence>
        <Hero isExpanded={isExpanded} setIsExpanded = {setIsExpanded} key="hero" />
      </AnimatePresence>
      {isExpanded && (
        <div className="fixed bottom-[3%] left-[3%] z-50">
        <motion.img
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ opacity: 1 }}
          onClick={() => {
            setIsExpanded(false)
          }}
          width={150}
          height={100}
          alt="Logo"
          src={logo}
          className="hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer"
        />
      </div>
      )}
    </div>
  );
}
