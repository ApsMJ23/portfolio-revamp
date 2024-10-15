import { useState, useEffect } from "react";
import { Code2 } from "lucide-react";
import clsx from "clsx";

const Header = () => {
    const [trigger, setTrigger] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setTrigger(true);
        } else {
            setTrigger(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={clsx("fixed top-0 left-0 w-full z-50 transition-shadow", {
            "shadow-lg bg-primary": trigger,
            "bg-transparent": !trigger,
        })}>
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center py-4">
                    <Code2 className="w-8 h-8 mr-6 text-white" />
                    <h1 className="text-lg font-bold hidden md:flex font-mono text-white">
                        Apurv Singh
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
