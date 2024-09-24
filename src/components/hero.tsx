import { GooglePlay, AppStore } from "./pages/advisory";

const Hero = () => {
    return (
        <div className="conatiner mt-9">
            <div className="flex flex-col sm:flex-row items-center">
                <div className="flex-1 self-center">
                    <div className="lg:pl-20 w-full flex justify-center items-center">
                        <div className="max-w-xs px-2.5 lg:max-w-sm relative">
                            <img
                                src="/hero.png"
                                // sizes="(min-width: 1024px) 16rem, 20rem"
                                className="rotate-3 rounded-2xl bg-background object-contain shadow-xl drop-shadow-xl shadow-zinc-900/30"
                            />
                            <img
                                src="/stamp.png"
                                className="absolute size-24 md:size-36 rotate-[15deg] right-0 top-0 translate-x-1/3 sm:translate-x-1/2 -translate-y-1/3 scale-110"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-1 sm:ml-10 lg:ml-0 lg:mt-0 mt-10 container text-center">
                    <div className="max-w-xl">
                        <h1 className="text-4xl sm:text-5xl md:text-5xl font-sans lg:text-6xl font-extrabold tracking-tighter">
                            UAE’S OWN <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dbc7a6] via-[#3d4957] to-[#282e3a]">
                                ETHICAL INVESTMENT
                            </span>{" "}
                            ADVISORY APP
                        </h1>
                        <div className="mt-6 text-lg" id="downloadSection">
                            Take steps to meet your financial goal with{" "}
                            <div className="text-xl lg:text-3xl font-extrabold">
                                <span className="inline-flex flex-col h-[calc(theme(fontSize.xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
                                    <ul className="block text-center leading-tight [&_li]:block">
                                        <li className="animate-slide text-transparent bg-clip-text bg-gradient-to-r from-[#dbc7a6] via-[#3d4957] to-[#282e3a]">
                                            Curated Equity Portfolio
                                        </li>
                                        <li className="animate-slide text-transparent bg-clip-text bg-gradient-to-r from-[#dbc7a6] via-[#3d4957] to-[#282e3a]">
                                            Global Market Access
                                        </li>
                                        <li className="animate-slide text-transparent bg-clip-text bg-gradient-to-r from-[#dbc7a6] via-[#3d4957] to-[#282e3a]">
                                            Qualified Investment Advisors
                                        </li>
                                        <li className="animate-slide text-transparent bg-clip-text bg-gradient-to-r from-[#dbc7a6] via-[#3d4957] to-[#282e3a]">
                                            Pre-Screened Stocks
                                        </li>
                                        <li className="animate-slide text-transparent bg-clip-text bg-gradient-to-r from-[#dbc7a6] via-[#3d4957] to-[#282e3a]">
                                            ETFs and Funds
                                        </li>
                                    </ul>
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-6 items-center justify-center">
                            <GooglePlay className="cursor-pointer w-36 md:w-48" />
                            <AppStore className="cursor-pointer w-36 md:w-48" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
