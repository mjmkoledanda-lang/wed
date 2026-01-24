import { ChevronDown } from "lucide-react";

const HomeSection = ({ weddingDate, setActiveTab }) => (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-8">
    <span className="inline-block px-4 py-1 border-y border-[#D4AF37] text-[#D4AF37] font-sans text-[10px] uppercase tracking-[0.4em]">
      Together with their families
    </span>

        <h1 className="text-6xl md:text-9xl font-light italic">
            Shazeen <span className="text-[#D4AF37] mx-4">&</span> Shimra
        </h1>

        <p className="italic opacity-70">
            Cordially invite you to celebrate their
            <span className="block text-2xl mt-2">Wedding Function</span>
        </p>

        <div className="text-4xl text-[#D4AF37]">{weddingDate}</div>

        <button onClick={() => setActiveTab("invitation")} className="text-[#D4AF37]">
            <ChevronDown className="animate-bounce" />
        </button>
    </section>
);

export default HomeSection;
