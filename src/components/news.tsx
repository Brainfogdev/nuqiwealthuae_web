import { useNavigate } from "react-router-dom";

const news = ["gulf", "khallej", "daily", "zawya", "difc"];

const News = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-primary/25 pt-12">
            <div className="flex flex-col gap-8 pb-12 items-center justify-center antialiased conatiner">
                <div>
                    <h1 className="text-3xl font-black font-sans tracking-tighter md:text-3xl container text-center">
                        Nuqi in the news
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {news.map((n) => (
                        <img
                            src={`/news/${n}.png`}
                            onClick={() => navigate("/press")}
                            className="max-w-48 cursor-pointer"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
