import { motion } from "framer-motion";
import { fetchBlogs } from "../lib/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Featured from "./Featured";
import BlogTile from "./BlogTile";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      const data = await fetchBlogs();
      setBlogs(data);
      setLoading(false);
    };
    loadBlogs();
  }, []);

  const featured = blogs.find((blog) => blog.featured);

  return (
    <motion.div
      className="w-full min-h-screen max-h-screen overflow-x-hidden overflow-y-auto bg-white flex justify-center items-start py-4 lg:pb-[70px] md:pb-[70px] pb-[90px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-[1200px] lg:px-[30px] flex flex-col items-start">
        <h1 className="text-[44px] lg:text-[64px] font-bold text-[#0a0a23] mb-10 ml-[15px]">
          insights
        </h1>

        {isLoading ? (
          <div className="w-full grid grid-cols-3 gap-[30px]">
            <div className="col-span-3 h-[540px] bg-gray-200 shimmer rounded-md mb-10" />
          </div>
        ) : (
          featured && (
            <Featured featured={featured} cardVariants={cardVariants} navigate={navigate}/>
          )
        )}
        <div>
            <h1 className="lg:text-[40px] p-[20px] md:text-[28px] text-[24px] font-semibold">
              All Posts 
            </h1>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] w-full">
          
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-[380px] bg-gray-200 shimmer rounded-md"
                  />
                ))
            : blogs.map((blog, i) => (
                <BlogTile blog={blog} navigate={navigate} cardVariants={cardVariants} i={i} />
              ))}
        </div>
      </div>
    </motion.div>
  );
}
