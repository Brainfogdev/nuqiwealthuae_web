import FeatureCard from "./feature-card";

const features = [
    {
        title: "Curated Equities",
        description: `Explore a diverse
            portfolio created by
            our Qualified
            Investment Advisors
            Our rigorous screening
            ensures alignment with
            Ethical, Social, and
            Sustainable Principles.`,
    },
    {
        title: "Prescreened investments",
        description: `Explore a vast selection
        of over 3000 meticulously
        vetted individual stocks,
        along with access to 11
        expertly curated equity 
        portfolios.`,
    },
    {
        title: "Robo Advisory",
        description: `Robo Advisory service
        coupled with a team of
        successful qualified
        Investment advisors to
        advice on individual
        investment portfolios`,
    },
    {
        title: "Regulated and secure",
        description: `A DFSA licensed and
            regulated company
            partnered with
            leading financial
            institutions and
            backed by strong data
            encryptions. Seamless and
            secure execution
            with our broker
            partners`,
    },
];

export function Features() {
    return (
        <div className="bg-primary/25">
            <div className="flex flex-col gap-8 py-12 mt-6 md:mt-16 items-center justify-center antialiased container">
                <div>
                    <h1 className="text-3xl font-black font-sans tracking-tighter md:text-3xl text-center">
                        Features
                    </h1>
                    <h2 className="text-xl font-bold font-sans tracking-tighter md:text-xl text-center text-secondary">
                        What{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dbc7a6] via-[#3d4957] to-[#282e3a] tracking-normal text-2xl px-1">
                            <span className="font-extrabold">Nuqi</span>
                        </span>{" "}
                        does for you
                    </h2>
                </div>
                <div className="grid md:grid-cols-4 gap-4 md:gap-8">
                    {features.map((feature, id) => (
                        <FeatureCard
                            src={`/features/feature-${id + 1}.png`}
                            heading={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
