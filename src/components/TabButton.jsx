const TabButton = ({ id, label, icon: Icon, activeTab, setActiveTab, setIsVisible }) => {
    return (
        <button
            onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                    setActiveTab(id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }, 300);
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-500 ${
                activeTab === id
                    ? "bg-[#D4AF37] text-white shadow-lg scale-105"
                    : "text-[#4A4238] hover:bg-[#D4AF37]/10"
            }`}
        >
            <Icon size={18} />
            <span className="font-sans text-xs font-bold uppercase tracking-widest">
        {label}
      </span>
        </button>
    );
};

export default TabButton;
