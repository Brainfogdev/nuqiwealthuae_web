// import { Announcement } from "../announcement";
import ContactForm from "../contact-form";
import Exclusives from "../exclusives";
import { Features } from "../features";
import Hero from "../hero";
import News from "../news";
import RegulatoryTieups from "../regulatory-tieups";

const Home = () => {
    return (
        <div className="overflow-x-hidden">
            {/* <Announcement /> */}
            <Hero />
            <Features />
            <RegulatoryTieups />
            {/* <Video /> */}
            {/* <Screening /> */}
            {/* <Press /> */}
            {/* <Download /> */}
            {/* <Portfolio /> */}
            <News />
            <Exclusives />
            <ContactForm />
        </div>
    );
};

export default Home;
