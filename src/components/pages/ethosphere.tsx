import { blogs } from "@/lib/blogs";
import BlogCard from "../blog-card"

const Ethosphere = () => {
    return (
        <div className="max-w-screen">
            <div className="px-4 pt-10 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl pb-5 font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#dbc7a6] via-[#3d4957] to-[#282e3a] sm:text-4xl lg:text-5xl">
                        Ethosphere
                    </h2>
                    {/* <p className="max-w-2xl mx-auto mt-4 text-base leading-relaxed text-secondary">
                        Uncover Your Ethical Investing Journey: Explore Nuqi's
                        Universe of 4000+ Ethical Global & Indian Stocks | ETF's
                    </p> */}
                </div>
            </div>

            <div className="flex flex-col justify-center items-center pt-20 gap-10 md:gap-16">
                <div className="grid md:grid-cols-3 grid-cols-1 container gap-4">
                    {blogs.reverse().map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Ethosphere;
