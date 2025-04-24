import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import "../index.css";

const BlogDetail = () => {
  const navigate = useNavigate();
  const { state: blog } = useLocation();
  console.log(blog);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">No blog data found.</p>
        <Button onClick={() => navigate("/blog")}>Back to Blogs</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-[30px] pb-[50px] max-w-[1200px] lg:px-[20px] md:px-[10px] h-screen overflow-y-auto scrollbar-hide  pb-[90px]">
      <Card className="mx-auto w-full shadow-none border-none bg-white">
        <CardContent className="py-6">
          <div className="space-y-[30px]">
            <div>
              <h2 className="lg:text-[64px] md:text-[48px] text-[36px] font-bold text-[#0a0a23] leading-snug mb-2">
                {blog.title}
              </h2>
              {blog.subheading && (
                <p className="lg:text-[28px] md:text-[20px] text-[20px] text-gray-600 mt-[20px] ">
                  {blog.subheading}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-[20px]">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex mt-4">
                <p className="text-sm text-muted-foreground">
                  {formatDate(blog.created_at)}
                  <span className="mx-1 text-gray-500">•</span>
                  <span className="font-medium text-gray-600">
                    By {blog.author}
                  </span>
                </p>
              </div>
            </div>

            <div
              className="prose prose-xl leading-relaxed prose-slate tiptap max-w-none leading-relaxed text-[#222] dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            />

            <div className="pt-4 mt-8">
              <h3 className="text-[20px] lg:text-[24px] font-semibold text-gray-800 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {blog.categories.length > 0 ? (
                  blog.categories.map((category) => (
                    <Badge key={category} variant="outline">
                      {category}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground text-sm">
                    No categories
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className=" text-[20px] lg:text-[24px] font-semibold text-gray-800 mb-2">Status</h3>
              <Badge
                variant={blog.status === "published" ? "default" : "secondary"}
              >
                {blog.status === "published" ? "Published" : "Draft"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex pl-[20px] flex-col sm:flex-row sm:justify-between gap-4 flex-wrap">
        <Button
          variant="default"
          onClick={() => navigate("/blog")}
          className="w-[160px] hover:cursor-pointer"
        >
          Back to Blog Page
        </Button>
      </div>
    </div>
  );
};

export default BlogDetail;
