import { Home, MailOpen, MapPin } from "lucide-react";
import TabButton from "./TabButton";

const Navbar = ({ activeTab, setActiveTab, setIsVisible }) => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md border-b border-[#D4AF37]/10 px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h2 className="text-xl md:text-2xl italic tracking-tighter font-light">
                    Shazeen <span className="text-[#D4AF37]">&</span> Shimra
                </h2>

                <div className="hidden md:flex items-center space-x-2">
                    <TabButton id="home" label="Home" icon={Home} {...{ activeTab, setActiveTab, setIsVisible }} />
                    <TabButton id="invitation" label="Invitation" icon={MailOpen} {...{ activeTab, setActiveTab, setIsVisible }} />
                    <TabButton id="location" label="Location" icon={MapPin} {...{ activeTab, setActiveTab, setIsVisible }} />
                </div>

                <div className="md:hidden flex space-x-4">
                    <button onClick={() => setActiveTab("home")}><Home size={20} /></button>
                    <button onClick={() => setActiveTab("invitation")}><MailOpen size={20} /></button>
                    <button onClick={() => setActiveTab("location")}><MapPin size={20} /></button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
