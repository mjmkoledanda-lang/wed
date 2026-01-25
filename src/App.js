import React, { useState, useEffect, useRef } from 'react';
import {
    Calendar,
    MapPin,
    Clock,
    Heart,
    ChevronDown,
    Music,
    Music2,
    Upload,
    Phone,
    Home,
    MailOpen,
    Menu,
    X
} from 'lucide-react';

function App() {
    const [activeTab, setActiveTab] = useState('home');
    const [isPlaying, setIsPlaying] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [rsvpName, setRsvpName] = useState('');
    const [rsvpMessage, setRsvpMessage] = useState('');
    const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
    const [fade, setFade] = useState(true);
    const audioRef = useRef(null);

    const weddingDate = "May 21, 2026";
    const weddingTime = "08:00 PM";
    const locationAddress = "No.60, Moor Street, Kalutara South.";
    const contactNumber = "+94 77 688 9699";
    const googleDriveLink =
        "https://drive.google.com/drive/folders/1-kykFeDTzB3kiq8k840hlp0vAsrGerN2?usp=sharing";

    // Countdown state
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: false,
    });

    // Countdown logic
    useEffect(() => {
        const weddingDateTime = new Date("May 21, 2026 20:00:00").getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDateTime - now;

            if (distance <= 0) {
                clearInterval(interval);
                setCountdown(prev => ({ ...prev, expired: true }));
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds, expired: false });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Audio play/pause
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.play();
            else audioRef.current.pause();
        }
    }, [isPlaying]);

    // Handle tab switching with fade effect
    const handleTabClick = (tab) => {
        setFade(false);
        setTimeout(() => {
            setActiveTab(tab);
            setFade(true);
        }, 150); // fade duration
        setMobileMenuOpen(false);
    };

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => handleTabClick(id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 text-sm md:text-xs ${
                activeTab === id
                    ? 'bg-[#D4AF37] text-white'
                    : 'text-[#4A4238] hover:bg-[#D4AF37]/20'
            }`}
        >
            <Icon size={16} />
            <span className="uppercase tracking-widest font-bold">{label}</span>
        </button>
    );

    const handleOverlayClick = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
        setOverlayVisible(false);
    };

    const handleRsvpSubmit = (e) => {
        e.preventDefault();
        if (!rsvpName) return;
        setRsvpSubmitted(true);
        setRsvpName('');
        setRsvpMessage('');
    };

    return (
        <div className="min-h-screen bg-[#FFFBF5] text-[#4A4238] font-serif relative">

            {/* Audio */}
            <audio ref={audioRef} src="/audio/fathiha.mp3" loop />

            {/* TAP TO START AUDIO */}
            {overlayVisible && (
                <div
                    onClick={handleOverlayClick}
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center text-white text-center px-4 cursor-pointer"
                >
                    <div>
                        <p className="text-2xl md:text-4xl font-semibold">
                            Tap anywhere to start audio
                        </p>
                        <p className="text-sm mt-2 opacity-70">
                            Please allow audio to enjoy the experience
                        </p>
                    </div>
                </div>
            )}

            {/* NAVBAR */}
            <nav className="fixed top-0 w-full z-40 bg-white/70 backdrop-blur border-b border-[#D4AF37]/20 px-4 md:px-6 py-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h2 className="text-xl italic cursor-pointer"
                        onClick={() => handleTabClick('home')} // Navigate to Home tab

                    >

                        Shazeen <span className="text-[#D4AF37]">&</span> Shimra
                    </h2>

                    {/* Desktop */}
                    <div className="hidden md:flex space-x-2">
                        <TabButton id="home" label="Home" icon={Home} />
                        <TabButton id="invitation" label="Invitation" icon={MailOpen} />
                        <TabButton id="rsvp" label="RSVP" icon={Heart} />
                        <TabButton id="location" label="Location" icon={MapPin} />
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="flex flex-col items-center space-y-2 mt-2 md:hidden">
                        <TabButton id="home" label="Home" icon={Home} />
                        <TabButton id="invitation" label="Invitation" icon={MailOpen} />
                        <TabButton id="rsvp" label="RSVP" icon={Heart} />
                        <TabButton id="location" label="Location" icon={MapPin} />
                    </div>
                )}
            </nav>

            {/* MAIN CONTENT */}
            <main className="pt-28 px-4 md:px-6 lg:px-12 transition-all duration-300">
                {/* HOME */}
                {activeTab === 'home' && fade && (
                    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 px-2 md:px-0 transition-opacity duration-300 opacity-100">
            <span className="border-y border-[#D4AF37] px-4 py-1 text-[#D4AF37] text-xs tracking-[0.3em] uppercase">
              Together with their families
            </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light italic leading-tight">
                            Shazeen <span className="text-[#D4AF37] mx-2 md:mx-4">&</span> Shimra
                        </h1>
                        <p className="italic opacity-70 text-lg md:text-xl">
                            Cordially invite you to celebrate their
                            <span className="block text-2xl md:text-3xl mt-2 not-italic">Wedding Function</span>
                        </p>
                        <div className="mt-6 md:mt-8">
                            <p className="text-4xl md:text-5xl text-[#D4AF37]">{weddingDate}</p>
                            <p className="uppercase text-xs md:text-sm tracking-widest mt-2">Pearl Grand Banquet Hall</p>
                        </div>
                        <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3">
                            {countdown.expired ? (
                                <span className="w-full text-center text-[#D4AF37] font-bold text-lg sm:text-xl md:text-2xl">
                  Wedding Day is Here!
                </span>
                            ) : (
                                ['days', 'hours', 'minutes', 'seconds'].map(unit => (
                                    <div key={unit} className="flex-1 min-w-[60px] max-w-[120px] bg-[#D4AF37]/20 border border-[#D4AF37] rounded-2xl px-3 py-2 flex flex-col items-center justify-center">
                                        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#D4AF37]">{countdown[unit]}</span>
                                        <span className="uppercase text-[8px] sm:text-xs md:text-sm tracking-widest text-[#4A4238]/70">{unit}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <button onClick={() => handleTabClick('invitation')} className="flex flex-col items-center text-[#D4AF37] mt-4 md:mt-6">
                            <span className="text-xs uppercase tracking-widest font-bold">More Details</span>
                            <ChevronDown className="animate-bounce mt-1 md:mt-2" />
                        </button>
                    </section>
                )}

                {/* INVITATION */}
                {activeTab === 'invitation' && fade && (
                    <section className="max-w-4xl mx-auto bg-white/50 rounded-3xl p-6 md:p-10 shadow-xl space-y-6 md:space-y-10 text-center transition-opacity duration-300 opacity-100">
                        <Heart className="mx-auto text-[#D4AF37]" size={40} md={48} />
                        <h2 className="text-3xl md:text-5xl italic font-light">The Invitation</h2>
                        <p className="text-sm md:text-lg opacity-80">
                            We warmly invite you to join us as we begin our journey together.
                            Your presence, prayers, and blessings mean everything to us.
                        </p>
                        <div className="grid gap-4 md:gap-8 md:grid-cols-3 border-y py-6 md:py-8">
                            <div>
                                <MapPin className="mx-auto text-[#D4AF37]" />
                                <p className="uppercase text-xs mt-1 md:mt-2 tracking-widest">Location</p>
                                <p className="text-sm md:text-base">Pearl Grand Banquet Hall</p>
                            </div>
                            <div>
                                <Calendar className="mx-auto text-[#D4AF37]" />
                                <p className="uppercase text-xs mt-1 md:mt-2 tracking-widest">Date</p>
                                <p className="text-sm md:text-base">21st May 2026</p>
                            </div>
                            <div>
                                <Clock className="mx-auto text-[#D4AF37]" />
                                <p className="uppercase text-xs mt-1 md:mt-2 tracking-widest">Time</p>
                                <p className="text-sm md:text-base">{weddingTime}</p>
                            </div>
                        </div>
                        <a href={googleDriveLink} target="_blank" rel="noreferrer"
                           className="inline-flex items-center w-full md:w-auto justify-center px-6 py-3 md:px-8 md:py-4 bg-[#D4AF37] text-white rounded-full uppercase tracking-widest text-xs md:text-sm font-bold">
                            <Upload className="mr-2" /> Upload Memories
                        </a>
                    </section>
                )}

                {/* RSVP */}
                {activeTab === 'rsvp' && fade && (
                    <section className="max-w-2xl mx-auto bg-white/50 rounded-3xl p-6 md:p-10 shadow-xl space-y-6 text-center transition-opacity duration-300 opacity-100">
                        <h2 className="text-3xl md:text-5xl italic font-light">RSVP</h2>
                        <p className="text-sm md:text-base opacity-80">Please let us know if you will be attending.</p>
                        {rsvpSubmitted && <p className="text-green-600 font-semibold">RSVP submitted successfully!</p>}
                        <form onSubmit={handleRsvpSubmit} className="flex flex-col space-y-4">
                            <input type="text" placeholder="Your Name" value={rsvpName} onChange={(e) => setRsvpName(e.target.value)}
                                   className="border border-[#D4AF37] rounded-lg px-4 py-2 text-sm md:text-base" required />
                            <textarea placeholder="Message (optional)" value={rsvpMessage} onChange={(e) => setRsvpMessage(e.target.value)}
                                      className="border border-[#D4AF37] rounded-lg px-4 py-2 text-sm md:text-base resize-none" />
                            <button type="submit" className="bg-[#D4AF37] text-white rounded-full px-6 py-2 md:px-8 md:py-3 uppercase tracking-widest font-bold hover:bg-[#b9922f] transition">Submit RSVP</button>
                        </form>
                    </section>
                )}

                {/* LOCATION */}
                {activeTab === 'location' && fade && (
                    <section className="max-w-4xl mx-auto space-y-6 md:space-y-10 text-center px-2 md:px-0 transition-opacity duration-300 opacity-100">
                        <h2 className="text-3xl md:text-5xl italic">Find Your Way</h2>
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
                            <div className="flex-1 bg-white/50 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col items-center justify-center space-y-2 md:space-y-4 min-h-[300px]">
                                <MapPin className="text-[#D4AF37]" size={32} />
                                <h3 className="text-lg md:text-xl font-semibold">Pearl Grand Banquet Hall</h3>
                                <p className="text-sm md:text-base opacity-80">{locationAddress}</p>
                                <a href={`tel:${contactNumber}`} className="flex items-center space-x-2 mt-2 text-[#D4AF37] font-semibold">
                                    <Phone size={16} /><span>{contactNumber}</span>
                                </a>
                            </div>
                            <div className="flex-1 relative overflow-hidden rounded-3xl shadow-xl min-h-[300px]">
                                <iframe
                                    title="Wedding Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5946305073207!2d79.9692585!3d6.572735099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae237006541d533%3A0x83c56abe1a801459!2sPearl%20Grand%20Banquet%20Hall!5e0!3m2!1sen!2slk!4v1769275470162!5m2!1sen!2slk"
                                    className="absolute inset-0 w-full h-full"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* MUSIC BUTTON */}
            <button onClick={() => setIsPlaying(!isPlaying)}
                    className="fixed bottom-4 md:bottom-6 right-4 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-white/90 rounded-full shadow-2xl flex items-center justify-center text-[#D4AF37] z-40">
                {isPlaying ? <Music2 className="animate-pulse" /> : <Music />}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                    {isPlaying ? 'ON' : 'OFF'}
                </div>
            </button>

            {/* FOOTER */}
            <footer className="py-4 md:py-6 text-center text-xs tracking-widest opacity-40">
                &copy; 2026 Mohamed Shazeen. All Rights Reserved.
            </footer>
        </div>
    );
}

export default App;
