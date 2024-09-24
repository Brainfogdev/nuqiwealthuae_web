import React from "react";

interface FeatureCardProps {
    src: string;
    heading: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    src,
    heading,
    description,
}) => {
    return (
        <div className="md:aspect-square flex flex-col p-4 text-center gap-2">
            <div className="aspect-square flex justify-center items-center mx-auto max-w-20">
                <img src={src} className="" />
            </div>
            <span className="font-semibold text-base pt-6">{heading}</span>
            <span className="tracking-tight text-sm">{description}</span>
        </div>
    );
};

export default FeatureCard;
