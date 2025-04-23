import { motion } from "framer-motion";
import { fetchBlogs } from "../lib/api";
import { useState, useEffect } from "react";
import '../index.css'

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const loadBlogs = async () => {
            setLoading(true)
            const data = await fetchBlogs();
            setBlogs(data);
            setLoading(false)
        };
        loadBlogs();
    }, []);

    const featured = blogs.find((blog) => blog.featured);

    return (
        <motion.div
            className="w-full min-h-screen flex items-center justify-center p-4 bg-white overflow-y-auto lg:pb-[50px] md:pb-[100px] pb-[100px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="w-full max-w-[1200px] px-[30px] flex flex-col items-start">
                <h1 className="text-[44px] lg:text-[64px] font-bold text-[#0a0a23] mb-10 ml-[15px]">insights</h1>

                {isLoading ? (<div className="w-full grid grid-cols-3 gap-[30px]">
                        <div className="col-span-3 h-[540px] bg-gray-200 shimmer rounded-md mb-10" />
                    </div>) : (
                        featured && (
                            <div className="w-full grid grid-cols-3 gap-[30px]">
                            <motion.div
                                key={featured.id}
                                className=" col-span-3 h-[540px] bg-gray-100 rounded-md relative overflow-hidden mb-10"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={cardVariants}
                                transition={{ duration: 0.5 }}
                            >
                                {featured.images?.[0] && (
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={featured.images[0]}
                                            alt={featured.title}
                                            className="w-full h-full object-cover opacity-20"
                                        />
                                    </div>
                                )}
                                <div className="relative z-10 h-full flex flex-col justify-end p-4">
                                    <div>
                                        <h3 className="text-lg lg:text-xl font-semibold text-[#0a0a23]">
                                            {featured.title}
                                        </h3>
                                        <p className="text-sm lg:text-base text-gray-600 mt-1">
                                            {featured.subheading}
                                        </p>
                                    </div>

                                    <div className="absolute bottom-2 right-4 bg-white/70 backdrop-blur-sm px-3 py-1 text-xs text-gray-600 shadow-sm">
                                        {featured.author}
                                    </div>
                                </div>

                            </motion.div>
                        </div>
                        )
                    )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] w-full">
                   {isLoading ? (
                    Array(3).fill(0).map((_, i) => (
                        <div
                          key={i}
                          className="h-[380px] bg-gray-200 shimmer rounded-md"
                        />
                      ))
                   ) : (
                    blogs.map((blog, i) => (
                        <motion.div
                            key={blog.id}
                            className="h-[380px] bg-gray-100 rounded-md overflow-hidden px-4 py-2 relative flex flex-col justify-end"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                            transition={{ duration: 0.5, delay: 0.2 * i }}
                        >
                            {blog.images?.[0] && (
                                <img
                                    src={blog.images[0]}
                                    alt={blog.title}
                                    className="w-full h-full object-cover absolute top-0 left-0 opacity-20"
                                />
                            )}
                            <div className="relative z-10 h-full flex flex-col justify-end p-4">
                                <div>
                                    <h3 className="text-lg lg:text-xl font-semibold text-[#0a0a23]">
                                        {blog.title}
                                    </h3>
                                    <p className="text-sm lg:text-base text-gray-600 mt-1">
                                        {blog.subheading}
                                    </p>
                                </div>

                                <div className="absolute bottom-0 right-4 bg-white/70 backdrop-blur-sm px-3 py-1 text-xs text-gray-600 shadow-sm">
                                    {blog.author}
                                </div>
                            </div>
                        </motion.div>
                    ))
                   )}
                </div>
            </div>
        </motion.div>
    );
}
