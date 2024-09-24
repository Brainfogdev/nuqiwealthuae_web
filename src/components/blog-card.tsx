import { ArrowRight } from "lucide-react";
import React from "react";

interface BlogCardProps {
    blog: {
        id: string;
        path: string;
        image: string;
        description: string;
        heading: string;
        content: JSX.Element;
        date: string;
        tags: string[];
    };
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    return (
        <button onClick={() => window.location.href = blog.path} className="rounded-md  bg-slate-50 group-hover:opacity-10 relative p-4 hover:cursor-pointer hover:rounded-md hover:bg-[#282e3a] hover:text-white">
            <div className="my-auto">
                {/* <img
                    src={`/blogs/${blog.image}`}
                    className="absolute inset-0 opacity-0 rounded-md -z-10 transition-opacity duration-300"
                /> */}
                <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
                <div>
                    <h1 className="font-bold text-xl py-2"> {blog.heading}</h1>
                    <p className=" line-clamp-3">{blog.description}</p>
                </div>
                <div className="flex justify-center items-center gap-1 py-3">
                    <p className="text-lg font-semibold">Read More</p>
                    <ArrowRight />
                </div>
            </div>
        </button>
    );
};

export default BlogCard;
