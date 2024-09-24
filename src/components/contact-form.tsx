import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const ContactForm = () => {
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(email, name, number);

        setEmail("");
        setName("");
        setNumber("");
    };

    return (
        <div className="flex flex-col gap-8 px-14 py-12 pb-12 items-center justify-center antialiased">
            <div>
                <h1 className="text-3xl font-black font-sans tracking-tighter md:text-3xl container text-center">
                    Begin your{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dbc7a6] via-[#3d4957] to-[#282e3a] tracking-normal px-1">
                        <span className="font-extrabold">Journey</span>
                    </span>
                    . Start a{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dbc7a6] via-[#3d4957] to-[#282e3a] tracking-normal px-1">
                        <span className="font-extrabold">conversation</span>
                    </span>
                    .
                </h1>
            </div>
            <form
                onSubmit={onSubmit}
                className="grid md:grid-cols-3 gap-4 md:gap-8 place-items-center container"
            >
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="text">Name</Label>
                    <Input
                        type="text"
                        id="text"
                        placeholder="Your name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="tel">Phone number</Label>
                    <div className="flex border border-gray-300 rounded-md">
                        <span className="flex items-center border-r px-3">
                            +971
                        </span>
                        <Input
                            type="tel"
                            id="tel"
                            placeholder="Your Phone number"
                            className="border-none"
                            onChange={(e) => setNumber(e.target.value)}
                            value={number}
                        />
                    </div>
                </div>

                <button className="md:col-start-2 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#3d4957,45%,#1e2631,55%,#3d4957)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
