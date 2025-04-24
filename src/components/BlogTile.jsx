import { motion } from "framer-motion"

export default function BlogTile({blog, cardVariants, navigate, i}) {
    return (
        <motion.div
            key={blog.id}
            className="h-[380px] bg-gray-100 overflow-hidden px-4 py-2 relative flex flex-col justify-end cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            transition={{ duration: 0.5, delay: 0.2 * i }}
            onClick={() => navigate(`/blogs/${blog.id}`, { state: blog })}
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
    )
}