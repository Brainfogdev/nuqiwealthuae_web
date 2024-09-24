import { cn } from "@/lib/utils";
import { Facebook, Instagram, Linkedin, LucideProps, Mail } from "lucide-react";
import { ReactNode } from "react";

function NavLink({
    href,
    children,
    disabled,
}: {
    href: string;
    children: ReactNode;
    disabled?: boolean;
}) {
    return (
        <div className={cn({ "pointer-events-none text-muted": disabled })}>
            <a href={href} className="transition text-primary">
                {children}
            </a>
        </div>
    );
}

export const Logo = (props: LucideProps) => {
    return (
        <div>
            <img
                alt="Nuqi Logo"
                src={"/logo2.png"}
                className={props && props.className ? props.className : "rounded-md h-12 w-25 p-2 object-contain"}
            />
        </div>
    );
};

const Waves = () => {
    return (
        <div className="relative -z-50 overflow-hidden h-48 md:h-64 lg:h-96 w-full">
            <img
                src="/waves-1.png"
                className="absolute bottom-0 translate-y-1/2 w-full"
            />
            <img
                src="/waves-2.png"
                className="absolute bottom-0 translate-y-1/2 w-full"
            />
        </div>
    );
};

export function Footer() {
    return (
        <>
            <Waves />
            <footer className="bg-[#333c49] text-white">
                <div className="py-10 container">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="text-white flex flex-col gap-2 items-center">
                            <Logo className="rounded-md h-14 w-30 p-2 object-contain" />
                            <div className="flex gap-3">
                                <a
                                    aria-label="Contact by Mail"
                                    className=" text-primary hover:text-primary-foreground dark:text-zinc-400 dark:hover:text-primary-foreground transition"
                                    href="mailto:support@nuqiwealth.in"
                                >
                                    <Mail className="size-4" />
                                </a>
                                <a
                                    aria-label="Follow on Instagram"
                                    className=" text-primary hover:text-primary-foreground dark:text-zinc-400 dark:hover:text-primary-foreground transition"
                                    href="https://www.instagram.com/nuqi_wealth/"
                                >
                                    <Instagram className="size-4" />
                                </a>
                                <a
                                    aria-label="Follow on Facebook"
                                    className=" text-primary hover:text-primary-foreground dark:text-zinc-400 dark:hover:text-primary-foreground transition"
                                    href="https://www.facebook.com/Nuqiadvisory"
                                >
                                    <Facebook className="size-4" />
                                </a>
                                <a
                                    aria-label="Follow on Linkedin"
                                    className=" text-primary hover:text-primary-foreground dark:text-zinc-400 dark:hover:text-primary-foreground transition"
                                    href="https://www.linkedin.com/company/nuqi-wealth"
                                >
                                    <Linkedin className="size-4" />
                                </a>
                            </div>
                        </div>
                        <div className="flex gap-24 md:pr-10">
                            <div className="hidden md:flex flex-col gap-2 text-xs font-sans max-w-40 text-primary">
                                <p>
                                    UAE: : Office 501, 05th FLoor, Innovation
                                    One, DIFC, Dubai, UAE
                                </p>
                                {/* <p>
                                    India: Office Nos 206, Parinee I, Veera
                                    Desai Road, Andheri West, Mumbai - 400053
                                </p> */}
                                {/* <p>
                                    Singapore: 33A, Pagoda Street, Singapore
                                    (059192)
                                </p> */}
                            </div>
                            <div className="flex flex-col gap-2 text-md font-semibold font-sans">
                                <NavLink href="/advisory">Advisory</NavLink>
                                <NavLink href="/about">About Us</NavLink>
                                <NavLink href="/faqs">FAQ's</NavLink>
                                <NavLink href="/ethosphere">Ethosphere</NavLink>
                                <NavLink href="/IRIS">
                                    IRIS
                                </NavLink>
                            </div>
                            <div className="flex flex-col gap-2 text-md font-semibold font-sans">
                                <NavLink href="/press">Media</NavLink>
                                <NavLink href="/contact">Contact Us</NavLink>
                                <NavLink href="/privacy">
                                    Privacy Policy
                                </NavLink>
                                <NavLink href="/disclaimer">Disclaimer</NavLink>
                                <NavLink href="/terms">Terms of Use</NavLink>

                                <NavLink href="/cookies">
                                    Cookies Policy
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:hidden flex-col gap-2 text-xs font-sans text-primary text-center py-6">
                        <p>
                            UAE: Innovation Hub One, 05th Floor, Office nos 501,
                            DIFC, Dubai, UAE
                        </p>
                        {/* <p>
                            India: Office Nos 205, Parinee I, Veera Desai Road,
                            Andheri West, Mumbai - 400053
                        </p> */}
                        {/* <p>Singapore: 33A, Pagoda Street, Singapore (059192)</p> */}
                    </div>
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row text-center text-primary/50 text-xs p-4">
                        <p>
                            © 2023 Nuqi Digital Wealth Limited. All rights
                            reserved. <br />
                            Nuqi Digital Wealth Limited is regulated by the
                            Dubai Financial Services Authority (“DFSA”) in the
                            Dubai International Financial Center (“DIFC”) and
                            holds a Category 3C license with a Retail Client
                            Endorsement. Arranging and advising of financial
                            services and managing assets. Nuqi Digital Wealth
                            Ltd is not authorised to hold client money.
                            Therefore, the client money rules do not apply to
                            the business currently undertaken by Nuqi Digital
                            Wealth Limited. <br />
                            Nuqi Digital Wealth Limited’s registered address is
                            Unit IH-00-01-05-OF-01, Level 5, Innovation Hub,
                            DIFC, Dubai, United Arab Emirates.
                            <br />
                            <span>
                                Please visit our{" "}
                                <a
                                    href="/disclaimer"
                                    target="_blank"
                                    className="underline underline-offset-2"
                                >
                                    Disclaimer Notice page
                                </a>{" "}
                                for further information.
                            </span>
                            <br />
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
