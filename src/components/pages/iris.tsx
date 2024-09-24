import {
    AreaChart,
    ArrowDownUp,
    // Factory,
    Filter,
    Flag,
    Search,
    SlidersHorizontal,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { irisRegions, irisSectors } from "@/lib/iris-sectors";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { LockClosedIcon, Cross1Icon } from '@radix-ui/react-icons';
import axios from "axios";
// import nodemailer from "nodemailer"

interface Stock {
    IndustryMasterName: string;
    Name: string;
    NSECode: string;
    ISIN: string;
    ChangePer: number;
    CurrentMarketPriceNSE: number;
    NSEPriceAsOnDate: string;
    NSEPREVCLOSE: number;
    NSEPriceAsOnPrevDate: string;
    WeekHigh52: number;
    WeekLow52: number;
}

interface Sector {
    name: string;
    industryMasterName: string;
}

interface Error {
    error: string;
    status: boolean;
}

const Iris = () => {
    const navigate = useNavigate();

    const [isUserLogedIn, setIsUserLogedIn] = useState(false)
    const [showUserLoginModal, setShowUserLoginModal] = useState(false)
    const [showOTPSection, setShowOTPSection] = useState(false)
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [region, setRegion] = useState("USA");
    const [exchange, setExchange] = useState(
        () => irisRegions.find((s) => s.name === region)?.exchanges[0]
    );
    const [searchKey, setSearchKey] = useState("");
    const [currencySymbol, setCurrencySymbol] = useState(region === "India" ? "₹" : "$")

    const [isNameSorted, setIsNameSorted] = useState(1);
    const [isPriceSorted, setIsPriceSorted] = useState(1);

    const [error1, setError1] = useState<Error | null>(null)
    const otpMailer = async (to: string) => {

        const response = await axios(
            {
                method: 'post',
                url: 'https://emailer-pro.up.railway.app/api/v1/mail/send/otp',
                data: {
                    to,
                    subject: "Your One-Time Password for IRIS – NUQI Wealth!"
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
            .catch((err) => {
                setError1(err && err.response && err.response.data)
            })
        if (response && response.data && response.data.allreadySignup) {
            setShowUserLoginModal(false)
            setShowOTPSection(false)
            setIsUserLogedIn(true)
            await localStorage.setItem('isUserLogedIn', 'true')
        }
        else if (response && response.data && response.data.hash) {
            return response.data.hash
        }
        return null
    }

    const [error2, setError2] = useState<Error | null>(null)
    const verifyMailedOTP = async (to: string, otp: string, hash: string) => {

        const response = await axios(
            {
                method: 'post',
                url: 'https://emailer-pro.up.railway.app/api/v1/mail/verify/otp',
                data: {
                    email: to,
                    otp,
                    hash
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
            .catch((err) => {
                console.log(err);
                setError2(err && err.response && err.response.data)
            })
        if (response && response.data && response.data.status) {
            return response.data.status
        }
        return null
    }

    const [email, setEmail] = useState("")
    const [otpHash, setOTPHash] = useState(``)

    const onSendOTP = async () => {
        const hash = await otpMailer(email)
        if (hash) {
            setOTPHash(hash)
            setShowUserLoginModal(false)
            setShowOTPSection(true)
        }

    }

    const [otp, setOTP] = useState("")
    const onVerifyOTP = async () => {
        const status = await verifyMailedOTP(email, otp, otpHash)
        if (status) {
            setShowOTPSection(false)
            setIsUserLogedIn(true)
            await localStorage.setItem('isUserLogedIn', 'true')
        }
    }

    useEffect(() => {
        const isUserLogedIn = localStorage.getItem('isUserLogedIn')
        if (isUserLogedIn === 'true') {
            setIsUserLogedIn(true)
        }
    }, [])

    const onReset = () => {
        setSectors([]);
        setRegion("India");
        setExchange(
            () => irisRegions.find((s) => s.name === region)?.exchanges[0]
        );
        setSearchKey("");
        fetchData();
    };

    const onApply = () => {
        const fetchSectorsData = async (sectors: Sector[]) => {
            console.log(sectors);
            if (region === "India") {
                setCurrencySymbol("₹")
            }
            else {
                setCurrencySymbol("$")
            }
            if (sectors.length === 0) {
                fetchData();
                return;
            }
            const selectedStocks: Stock[] = [];
            await Promise.all(
                sectors.map(async (s) => {
                    let queryString = `https://api.nuqiwealth.in/GetSectorWiseStockDetails?sector=${s.industryMasterName}&nsccode=`;

                    if (region === "USA") {
                        queryString = `https://api.nuqiwealth.in/GetUSDSectorWiseStockDetails?sector=${s.industryMasterName}&exchange=${exchange}`;
                    }

                    const response = await fetch(queryString, {
                        method: "GET",
                    });

                    const data = await response.json();
                    selectedStocks.push(...data.Data.Table);
                })
            );
            setStocks(selectedStocks);
        };
        fetchSectorsData(sectors);
    };

    useEffect(() => {
        setExchange(irisRegions.find((s) => s.name === region)?.exchanges[0]);
    }, [region]);

    const fetchData = async () => {
        if (region === "India") {
            const response = await fetch(
                "https://api.nuqiwealth.in/GetSectorWiseStockDetails?sector=&nsccode=",
                {
                    method: "GET",
                }
            );

            const data = await response.json();
            setStocks(data.Data.Table);
        } else {
            const response = await fetch(
                `https://api.nuqiwealth.in/GetUSDSectorWiseStockDetails?sector=&exchange=${exchange}`,
                {
                    method: "GET",
                }
            );

            const data = await response.json();
            setStocks(data.Data.Table);
        }
    };

    console.log(region, exchange);

    // useEffect(() => {
    //     const fetchSectorsData = async (sectors: Sector[]) => {
    //         console.log(sectors);
    //         if (sectors.length === 0) {
    //             fetchData();
    //             return;
    //         }
    //         const selectedStocks: Stock[] = [];
    //         await Promise.all(
    //             sectors.map(async (s) => {
    //                 let queryString = `https://api.nuqiwealth.in/GetSectorWiseStockDetails?sector=${s.industryMasterName}&nsccode=`;

    //                 if (region === "USA") {
    //                     queryString = `https://api.nuqiwealth.in/GetUSDSectorWiseStockDetails?sector=${s.industryMasterName}&exchange=${exchange}`;
    //                 }

    //                 const response = await fetch(queryString, {
    //                     method: "GET",
    //                 });

    //                 const data = await response.json();
    //                 selectedStocks.push(...data.Data.Table);
    //             })
    //         );
    //         setStocks(selectedStocks);
    //     };
    //     fetchSectorsData(sectors);
    // }, [sectors, exchange, region]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (searchKey.length === 0) {
            fetchData();
            return;
        }
        setStocks((prev) =>
            prev.filter((p) =>
                p.Name.toLowerCase().includes(searchKey.toLowerCase())
            )
        );
    }, [searchKey]);

    const sortByName = () => {
        if (isNameSorted % 3 === 0) {
            fetchData();
        } else if (isNameSorted % 3 === 1) {
            const sortedStocks = stocks.sort((a, b) => {
                return a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1;
            });
            setStocks([...sortedStocks]);
        } else {
            const sortedStocks = stocks.sort((a, b) => {
                return a.Name.toLowerCase() > b.Name.toLowerCase() ? -1 : 1;
            });
            setStocks([...sortedStocks]);
        }
        setIsNameSorted(isNameSorted + 1);
    };

    const sortByPrice = () => {
        if (isPriceSorted % 3 === 0) {
            fetchData();
        } else if (isPriceSorted % 3 === 1) {
            const sortedStocks = stocks.sort((a, b) => {
                return a.CurrentMarketPriceNSE > b.CurrentMarketPriceNSE
                    ? -1
                    : 1;
            });
            setStocks([...sortedStocks]);
        } else {
            const sortedStocks = stocks.sort((a, b) => {
                return a.CurrentMarketPriceNSE > b.CurrentMarketPriceNSE
                    ? 1
                    : -1;
            });
            setStocks([...sortedStocks]);
        }
        setIsPriceSorted(isPriceSorted + 1);
    };

    return (
        <section className="py-5 sm:py-16 lg:py-1">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#dbc7a6] via-[#3d4957] to-[#282e3a] sm:text-4xl lg:text-5xl">
                        Ethical Screener
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-base leading-relaxed text-secondary">
                        Uncover Your Ethical Investing Journey: Explore Nuqi's
                        Universe of 4000+ Ethical Global & Indian Stocks | ETF's
                    </p>
                </div>
            </div>
            <div className="flex md:container py-10 w-full">
                <div className="hidden md:block">
                    <div className="flex flex-col border border-secondary/25 shadow-md rounded-md whitespace-nowrap max-h-min">
                        <div className="flex items-center gap-1 px-4 py-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <h2 className="text-xl font-semibold tracking-wide">
                                Filter By
                            </h2>
                        </div>
                        <Separator className="bg-secondary/25 my-1" />
                        <div className="w-72">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                <AccordionItem value="item-1" className="">
                                    <AccordionTrigger className="px-1 py-2">
                                        <div className="flex items-center gap-1 px-4 py-2">
                                            <Flag className="h-4 w-4 text-muted-foreground" />
                                            <h2 className="text-lg font-semibold">
                                                Region
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-5 py-2">
                                        <div className="flex flex-col gap-3">
                                            {irisRegions.map((r) => (
                                                <div
                                                    className="flex items-center space-x-2"
                                                    key={r.name}
                                                >
                                                    <Checkbox
                                                        id={r.name}
                                                        checked={
                                                            region === r.name
                                                        }
                                                        onCheckedChange={(
                                                            state
                                                        ) => {
                                                            if (state) {
                                                                setRegion(
                                                                    r.name
                                                                );
                                                            }
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={r.name}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {r.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                {/* <AccordionItem value="item-2">
                                    <AccordionTrigger className="px-1 py-2">
                                        <div className="flex items-center gap-1 px-4 py-2">
                                            <Factory className="h-4 w-4 text-muted-foreground" />
                                            <h2 className="text-lg font-semibold">
                                                Exchange
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-5 py-2">
                                        <div className="flex flex-col gap-3">
                                            {irisRegions
                                                .find((s) => s.name === region)
                                                ?.exchanges.map((e) => (
                                                    <div
                                                        className="flex items-center space-x-2"
                                                        key={e}
                                                    >
                                                        <Checkbox
                                                            id={e}
                                                            checked={
                                                                exchange === e
                                                            }
                                                            onCheckedChange={(
                                                                state
                                                            ) => {
                                                                if (state) {
                                                                    setExchange(
                                                                        e
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={e}
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            {e}
                                                        </label>
                                                    </div>
                                                ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem> */}
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="px-1 py-2">
                                        <div className="flex items-center gap-1 px-4 py-2">
                                            <AreaChart className="h-4 w-4 text-muted-foreground" />
                                            <h2 className="text-lg font-semibold">
                                                Sector
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-5 py-2">
                                        <div className="flex flex-col gap-3">
                                            {irisSectors.map((sector) => (
                                                <div
                                                    className="flex items-center space-x-2"
                                                    key={
                                                        sector.industryMasterName
                                                    }
                                                >
                                                    <Checkbox
                                                        id={
                                                            sector.industryMasterName
                                                        }
                                                        checked={
                                                            sectors.find(
                                                                (s) =>
                                                                    s.industryMasterName ===
                                                                    sector.industryMasterName
                                                            ) !== undefined
                                                        }
                                                        onCheckedChange={(
                                                            state
                                                        ) => {
                                                            if (!state) {
                                                                setSectors(
                                                                    sectors.filter(
                                                                        (s) =>
                                                                            s.industryMasterName !==
                                                                            sector.industryMasterName
                                                                    )
                                                                );
                                                            } else {
                                                                setSectors(
                                                                    sectors.concat(
                                                                        sector
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={
                                                            sector.industryMasterName
                                                        }
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {sector.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                    <div className="flex w-full items-center gap-4 p-4">
                        <button
                            className="w-full inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#3d4957,45%,#1e2631,55%,#3d4957)] bg-[length:200%_100%] px-4 lg:px-6 font-medium text-background transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 whitespace-nowrap"
                            onClick={onReset}
                        >
                            Reset
                        </button>
                        <button
                            className="w-full inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#3d4957,45%,#1e2631,55%,#3d4957)] bg-[length:200%_100%] px-4 lg:px-6 font-medium text-background transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 whitespace-nowrap"
                            onClick={onApply}
                        >
                            Apply
                        </button>
                    </div>
                </div>

                <div className="w-full md:px-8 px-3">
                    <div className="">
                        <div className="mx-2 md:mx-10 mb-6 flex items-center gap-4">
                            <div className="relative ml-auto w-full">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full rounded-lg bg-background pl-8"
                                    value={searchKey}
                                    onChange={(e) =>
                                        setSearchKey(e.target.value)
                                    }
                                />
                            </div>
                            <Dialog>
                                <DialogTrigger className=" md:hidden">
                                    <SlidersHorizontal className="h-4 w-4 md:hidden" />
                                </DialogTrigger>
                                <DialogContent className="p-0">
                                    <>
                                        <div className="flex flex-col border border-secondary/25 shadow-md rounded-md whitespace-nowrap max-h-min">
                                            <div className="flex items-center gap-1 px-4 py-2">
                                                <Filter className="h-4 w-4 text-muted-foreground" />
                                                <h2 className="text-xl font-semibold tracking-wide">
                                                    Filter By
                                                </h2>
                                            </div>
                                            <Separator className="bg-secondary/25 my-1" />
                                            <div className="w-full">
                                                <Accordion
                                                    type="single"
                                                    collapsible
                                                    className="w-full"
                                                >
                                                    <AccordionItem
                                                        value="item-1"
                                                        className=""
                                                    >
                                                        <AccordionTrigger className="px-1 py-2">
                                                            <div className="flex items-center gap-1 px-4 py-2">
                                                                <Flag className="h-4 w-4 text-muted-foreground" />
                                                                <h2 className="text-lg font-semibold">
                                                                    Region
                                                                </h2>
                                                            </div>
                                                        </AccordionTrigger>
                                                        <AccordionContent className="px-5 py-2">
                                                            <div className="flex flex-col gap-3">
                                                                {irisRegions.map(
                                                                    (r) => (
                                                                        <div
                                                                            className="flex items-center space-x-2"
                                                                            key={
                                                                                r.name
                                                                            }
                                                                        >
                                                                            <Checkbox
                                                                                id={
                                                                                    r.name
                                                                                }
                                                                                checked={
                                                                                    region ===
                                                                                    r.name
                                                                                }
                                                                                onCheckedChange={(
                                                                                    state
                                                                                ) => {
                                                                                    if (
                                                                                        state
                                                                                    ) {
                                                                                        setRegion(
                                                                                            r.name
                                                                                        );
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <label
                                                                                htmlFor={
                                                                                    r.name
                                                                                }
                                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                            >
                                                                                {
                                                                                    r.name
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                    {/* <AccordionItem value="item-2">
                                                        <AccordionTrigger className="px-1 py-2">
                                                            <div className="flex items-center gap-1 px-4 py-2">
                                                                <Factory className="h-4 w-4 text-muted-foreground" />
                                                                <h2 className="text-lg font-semibold">
                                                                    Exchange
                                                                </h2>
                                                            </div>
                                                        </AccordionTrigger>
                                                        <AccordionContent className="px-5 py-2">
                                                            <div className="flex flex-col gap-3">
                                                                {irisRegions
                                                                    .find(
                                                                        (s) =>
                                                                            s.name ===
                                                                            region
                                                                    )
                                                                    ?.exchanges.map(
                                                                        (e) => (
                                                                            <div
                                                                                className="flex items-center space-x-2"
                                                                                key={
                                                                                    e
                                                                                }
                                                                            >
                                                                                <Checkbox
                                                                                    id={
                                                                                        e
                                                                                    }
                                                                                    checked={
                                                                                        exchange ===
                                                                                        e
                                                                                    }
                                                                                    onCheckedChange={(
                                                                                        state
                                                                                    ) => {
                                                                                        if (
                                                                                            state
                                                                                        ) {
                                                                                            setExchange(
                                                                                                e
                                                                                            );
                                                                                        }
                                                                                    }}
                                                                                />
                                                                                <label
                                                                                    htmlFor={
                                                                                        e
                                                                                    }
                                                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                                >
                                                                                    {
                                                                                        e
                                                                                    }
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    )}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem> */}
                                                    <AccordionItem value="item-3">
                                                        <AccordionTrigger className="px-1 py-2">
                                                            <div className="flex items-center gap-1 px-4 py-2">
                                                                <AreaChart className="h-4 w-4 text-muted-foreground" />
                                                                <h2 className="text-lg font-semibold">
                                                                    Sector
                                                                </h2>
                                                            </div>
                                                        </AccordionTrigger>
                                                        <AccordionContent className="px-5 py-2">
                                                            <div className="flex flex-col gap-3">
                                                                {irisSectors.map(
                                                                    (
                                                                        sector
                                                                    ) => (
                                                                        <div
                                                                            className="flex items-center space-x-2"
                                                                            key={
                                                                                sector.industryMasterName
                                                                            }
                                                                        >
                                                                            <Checkbox
                                                                                id={
                                                                                    sector.industryMasterName
                                                                                }
                                                                                checked={
                                                                                    sectors.find(
                                                                                        (
                                                                                            s
                                                                                        ) =>
                                                                                            s.industryMasterName ===
                                                                                            sector.industryMasterName
                                                                                    ) !==
                                                                                    undefined
                                                                                }
                                                                                onCheckedChange={(
                                                                                    state
                                                                                ) => {
                                                                                    if (
                                                                                        !state
                                                                                    ) {
                                                                                        setSectors(
                                                                                            sectors.filter(
                                                                                                (
                                                                                                    s
                                                                                                ) =>
                                                                                                    s.industryMasterName !==
                                                                                                    sector.industryMasterName
                                                                                            )
                                                                                        );
                                                                                    } else {
                                                                                        setSectors(
                                                                                            sectors.concat(
                                                                                                sector
                                                                                            )
                                                                                        );
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <label
                                                                                htmlFor={
                                                                                    sector.industryMasterName
                                                                                }
                                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                            >
                                                                                {
                                                                                    sector.name
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-center gap-4 p-2">
                                            <button
                                                className="w-full inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#3d4957,45%,#1e2631,55%,#3d4957)] bg-[length:200%_100%] px-4 lg:px-6 font-medium text-background transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 whitespace-nowrap"
                                                onClick={onReset}
                                            >
                                                Reset
                                            </button>
                                            <button
                                                className="w-full inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#3d4957,45%,#1e2631,55%,#3d4957)] bg-[length:200%_100%] px-4 lg:px-6 font-medium text-background transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 whitespace-nowrap"
                                                onClick={onApply}
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="rounded-md  flex flex-col border border-secondary/25 shadow-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead
                                            className="cursor-pointer"
                                            onClick={sortByName}
                                        >
                                            <div className="flex items-center">
                                                <p>Name</p>
                                                <ArrowDownUp className="h-4 w-4" />
                                            </div>
                                        </TableHead>
                                        <TableHead
                                            onClick={sortByPrice}
                                            className="cursor-pointer"
                                        >
                                            <div className="flex items-center">
                                                <p>Price</p>
                                                <ArrowDownUp className="h-4 w-4" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-center">
                                            52 Week High
                                        </TableHead>
                                        <TableHead className="text-center">
                                            52 Week Low
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Change
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Ethical Compliance
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="w-full">
                                    {stocks.map((s, index) => (
                                        !isUserLogedIn && index > 2 ?
                                            <>
                                                <TableRow
                                                    key={s.Name}
                                                    className="blur"
                                                >
                                                    <TableCell className="font-normal md:font-medium">
                                                        {s.Name}
                                                    </TableCell>
                                                    <TableCell className="font-normal md:font-semibold whitespace-nowrap">
                                                        {currencySymbol}{" "}
                                                        {s.CurrentMarketPriceNSE.toLocaleString("en-GB")}
                                                    </TableCell>
                                                    <TableCell className="text-center whitespace-nowrap">
                                                        {currencySymbol} {s.WeekHigh52.toLocaleString("en-GB")}
                                                    </TableCell>
                                                    <TableCell className="text-center whitespace-nowrap">
                                                        {currencySymbol} {s.WeekLow52.toLocaleString("en-GB")}
                                                    </TableCell>
                                                    <TableCell
                                                        className={cn(
                                                            "text-right font-bold whitespace-nowrap",
                                                            {
                                                                "text-green-500":
                                                                    s.ChangePer > 0,
                                                                "text-red-500":
                                                                    s.ChangePer < 0,
                                                            }
                                                        )}
                                                    >
                                                        {s.ChangePer.toFixed(2)} %
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-center bg-green-200 rounded-md border-green-500 text-green-800 md:p-1 p-1">
                                                            Compliant
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-normal md:font-medium md:hidden md:px-8 px-3">
                                                        {!isUserLogedIn && index === 3 && <button
                                                            className="md:col-start-2 ml-10 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#3d4957,45%,#1e2631,55%,#3d4957)] bg-[length:200%_100%] px-4 lg:px-6 font-medium text-background transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 whitespace-nowrap"
                                                            onClick={() => setShowUserLoginModal(true)}
                                                        >
                                                            <LockClosedIcon className="mr-2 h-6 w-6" />
                                                            Sign-Up for free and unlock.
                                                        </button>}
                                                    </TableCell>
                                                    <TableCell className="font-normal md:font-semibold whitespace-nowrap">

                                                    </TableCell>
                                                    <TableCell className="text-center whitespace-nowrap">
                                                    </TableCell>
                                                    <TableCell className="text-center whitespace-nowrap hidden md:block">
                                                        {!isUserLogedIn && index === 3 && <button
                                                            className="md:col-start-2 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#3d4957,45%,#1e2631,55%,#3d4957)] bg-[length:200%_100%] px-4 lg:px-6 font-medium text-background transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 whitespace-nowrap"
                                                            onClick={() => setShowUserLoginModal(true)}
                                                        >
                                                            <LockClosedIcon className="mr-2 h-6 w-6" />
                                                            Sign-Up for free and unlock.
                                                        </button>}

                                                    </TableCell>
                                                    <TableCell>

                                                    </TableCell>
                                                    <TableCell>

                                                    </TableCell>
                                                </TableRow>

                                            </>
                                            :
                                            <TableRow
                                                key={s.Name}
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    if (region === "India") {
                                                        navigate(
                                                            `/stock?symbol=BSE:${s.NSECode}`
                                                        );
                                                    } else {
                                                        navigate(
                                                            `/stock?symbol=${exchange}:${s.NSECode}`
                                                        );
                                                    }
                                                }}
                                            >
                                                <TableCell className="font-normal md:font-medium">
                                                    {s.Name}
                                                </TableCell>
                                                <TableCell className="font-normal md:font-semibold whitespace-nowrap">
                                                    {currencySymbol}{" "}
                                                    {s.CurrentMarketPriceNSE.toLocaleString("en-GB")}
                                                </TableCell>
                                                <TableCell className="text-center whitespace-nowrap">
                                                    {currencySymbol} {s.WeekHigh52.toLocaleString("en-GB")}
                                                </TableCell>
                                                <TableCell className="text-center whitespace-nowrap">
                                                    {currencySymbol} {s.WeekLow52.toLocaleString("en-GB")}
                                                </TableCell>
                                                <TableCell
                                                    className={cn(
                                                        "w-10 text-right font-bold whitespace-nowrap",
                                                        {
                                                            "text-green-500":
                                                                s.ChangePer > 0,
                                                            "text-red-500":
                                                                s.ChangePer < 0,
                                                        }
                                                    )}
                                                >
                                                    {s.ChangePer.toFixed(2)} %
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-center bg-green-200 rounded-md border-green-500 text-green-800 md:p-2 p-1">
                                                        Compliant
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {stocks.length === 0 && (
                                <div className="text-center w-full flex justify-center font-semibold text-lg p-4">
                                    No matching stocks available. Try out
                                    different filters!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showUserLoginModal && <div className="static">
                <div
                    className="fixed h-screen w-screen bg-black z-10 top-0 opacity-75"
                ></div>
                { /** Just added */}
                <div className="fixed h-screen top-0 right-0 left-0 z-20 flex justify-center items-center">
                    <div className="mx-4 my-4 bg-slate-200 p-7 rounded-xl">
                        <div className="flex justify-end">
                            <button onClick={() => {
                                setShowUserLoginModal(false)
                                setError2(null)
                                setError1(null)
                            }}>
                                <Cross1Icon className="mb-2 h-5 w-5" />
                            </button>
                        </div>
                        <div className="w-full justify-center items-center">
                            <LockClosedIcon className="mb-2 h-10 w-10" />
                            <h1 className="text-black text-xl font-medium ">Sign-Up to Unlock</h1>
                            <p className="text-black mb-5 text-sm">
                                Sign-up for free and unlock all list.
                            </p>
                            {error1 && error1.error && <p className="text-red-500 text-sm mb-2 font-medium ">{error1.error}</p>}
                            <input type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email" className="border-2 border-slate-500 rounded-md p-2 w-full " />
                            <button
                                className="md:col-start-2 self-center mt-5 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#3d4957,45%,#1e2631,55%,#3d4957)] bg-[length:200%_100%] px-4 lg:px-6 font-medium text-background transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 whitespace-nowrap"
                                onClick={onSendOTP}
                            >
                                Unlock
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
            {showOTPSection && <div className="static">
                <div
                    className="fixed h-screen w-screen bg-black z-10 top-0 opacity-75 "
                ></div>
                { /** Just added */}
                <div className="fixed h-screen top-0 right-0 left-0 z-20 flex justify-center items-center">
                    <div className="mx-4 my-4 bg-slate-200 p-7 rounded-xl rounded-md py-2 md:py-6 md:px-8 flex flex-col gap-8 border border-secondary/25 shadow-md">
                        <div className="flex justify-end">
                            <button onClick={() => {
                                setShowOTPSection(false)
                                setError2(null)
                                setError1(null)
                            }}>
                                <Cross1Icon className="mb-2 h-5 w-5" />
                            </button>
                        </div>
                        <div className="w-full justify-center items-center">
                            <LockClosedIcon className="mb-2 h-10 w-10" />
                            <h1 className="text-black text-xl font-medium ">Verify OTP to Unlock</h1>
                            <p className="text-black mb-5 text-sm">
                                Last step to unlock all list.
                            </p>
                            {error2 && error2.error && <p className="text-red-500 text-sm mb-2 font-medium ">{error2.error}</p>}
                            <input type="text"
                                onChange={(e) => setOTP(e.target.value)}
                                placeholder="OTP" className="border-2 border-slate-500 rounded-md p-2 w-full " />
                            <button
                                className="md:col-start-2 self-center mt-5 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#3d4957,45%,#1e2631,55%,#3d4957)] bg-[length:200%_100%] px-4 lg:px-6 font-medium text-background transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 whitespace-nowrap"
                                onClick={onVerifyOTP}
                            >
                                Verify OTP
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
        </section>
    );
};

export default Iris;
