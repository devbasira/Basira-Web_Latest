import { motion } from "framer-motion"

export default function Featured({featured, cardVariants, navigate}) {

    return (
        <div className="w-full grid grid-cols-3 gap-[30px] cursor-pointer">
            <motion.div
                key={featured.id}
                className=" col-span-3 h-[540px] bg-gray-100 rounded-md relative overflow-hidden mb-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                transition={{ duration: 0.5 }}
                onClick={() => navigate(`/blogs/${featured.id}`, { state: featured })}
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
}