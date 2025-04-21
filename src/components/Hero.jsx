import { motion, AnimatePresence } from "framer-motion";
import plus from '../assets/plus.svg'
import { useState } from "react";


export default function Hero({ isExpanded, setIsExpanded }) {
    const [showEmail, setShowEmail] = useState(false);

    return (
        <motion.div
            className="w-full min-h-screen flex items-center justify-center px-4 bg-white "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
        >
            <motion.div
                className="w-full max-w-[1200px] px-[10px] lg:px-[30px] relative flex flex-col items-start justify-center "
                layout
                transition={{ layout: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }}
            >
                <motion.div
                    className="flex items-start overflow-hidden"
                    layout
                    transition={{ duration: 0.6 }}
                >
                    <motion.h1
                        className="text-[44px] lg:text-[92px] bg-transparent font-bold text-[#0a0a23]"
                        animate={{
                            scale: isExpanded ? 0.7 : 1,
                            transition: { duration: 0.6 },
                        }}
                        style={{
                            transformOrigin: "left",
                        }}
                    >
                        make things easy
                    </motion.h1>
                </motion.div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div

                            key="expanded-content"
                            className="lg:w-[820px] flex flex-col items-start gap-[24px] text-left"
                        >
                            <p className="font-light text-[16px] lg:text-[20px] text-gray-800">
                                At Basira, we design to simplify.<br />
                                To make things feel clear, intuitive, and grounded in meaning. <br />
                                Whether it’s a brand, a space, or a story — we build with intention,
                                so what you create feels effortless to experience.
                            </p>
                            <p className="font-light text-[16px] lg:text-[20px] text-gray-800">
                                Let’s build something meaningful. <br />
                                Start fresh or reimagine what’s already there — we’re ready.
                            </p>
                            {!showEmail ? (
                                <button
                                    className="underline text-[#0a0a23] font-semibold text-md lg:text-lg hover:opacity-80"
                                    onClick={() => setShowEmail(true)}
                                >
                                    Start a Conversation
                                </button>
                            ) : (
                                <a
                                    href="mailto:contact@basirastudio.com?subject=Let’s Connect&body=Hi Basira Studio,"
                                    className="underline text-[#0a0a23] font-semibold text-md lg:text-lg hover:opacity-80"
                                >
                                    contact@basirastudio.com
                                </a>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    onClick={() => {
                        setIsExpanded((prev) => !prev)
                        setShowEmail(false)
                    }}
                    className="group cursor-pointer"
                    animate={{
                        rotate: isExpanded ? 45 : 0,
                        scale: isExpanded ? 0.8 : 1,
                        y: isExpanded ? 20 : 0,
                        transition: { duration: 0.5 },
                    }}
                >
                    <img
                        src={plus}
                        width={45}
                        height={45}
                        className="text-gray-500 mt-[20px] group-hover:text-yellow-500 transition-colors duration-300"
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}