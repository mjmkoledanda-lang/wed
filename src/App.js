import React, {useEffect, useRef, useState} from 'react';
import {
    Calendar,
    ChevronDown,
    Clock,
    Heart,
    Home,
    MailOpen,
    MapPin,
    Menu,
    Music,
    Music2,
    Phone,
    Upload,
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
    const [showRsvpDialog, setShowRsvpDialog] = useState(false);
    const [fade, setFade] = useState(true);
    const audioRef = useRef(null);
    const [mapLoading, setMapLoading] = useState(true);
    const [rsvpLoading, setRsvpLoading] = useState(false);
    const [nameError, setNameError] = useState("");


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
                setCountdown(prev => ({...prev, expired: true}));
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown({days, hours, minutes, seconds, expired: false});
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // iOS KEYBOARD VIEWPORT FIX
    useEffect(() => {
        const setAppHeight = () => {
            const height =
                window.visualViewport?.height || window.innerHeight;
            document.documentElement.style.setProperty(
                "--app-height",
                `${height}px`
            );
        };

        setAppHeight();

        window.addEventListener("resize", setAppHeight);
        window.visualViewport?.addEventListener("resize", setAppHeight);

        return () => {
            window.removeEventListener("resize", setAppHeight);
            window.visualViewport?.removeEventListener("resize", setAppHeight);
        };
    }, []);

    useEffect(() => {
        if (activeTab === "rsvp") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [activeTab]);


    // Audio play/pause
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.1; // set softer background music
            if (isPlaying) audioRef.current.play();
            else audioRef.current.pause();
        }
    }, [isPlaying]);
    // STOP AUDIO WHEN APP GOES TO BACKGROUND OR TAB IS CLOSED
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                audio.pause();

            } else if (isPlaying) {
                audio.play().catch(() => {
                });
            }
        };

        const stopAudio = () => {
            audio.pause();
            audio.currentTime = 0;
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("beforeunload", stopAudio);
        window.addEventListener("pagehide", stopAudio);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("beforeunload", stopAudio);
            window.removeEventListener("pagehide", stopAudio);
        };
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

    const TabButton = ({id, label, icon: Icon}) => (
        <button
            onClick={() => handleTabClick(id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 text-sm md:text-xs ${
                activeTab === id
                    ? 'bg-[#D4AF37] text-white'
                    : 'text-[#4A4238] hover:bg-[#D4AF37]/20'
            }`}
        >
            <Icon size={16}/>
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

    const handleRsvpSubmit = async (e) => {
        e.preventDefault();
        const trimmedName = rsvpName.trim();

        if (!trimmedName) {
            setNameError("Please enter your name");
            return;
        }

        if (trimmedName.length < 3) {
            setNameError("Name must be at least 3 characters");
            return;
        }

        if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
            setNameError("Name can contain only letters");
            return;
        }

        setNameError(""); // clear error if valid


        setRsvpLoading(true); // 🔹 START LOADING

        try {
            await fetch(
                "https://script.google.com/macros/s/AKfycbzzOwmgSzvXARa582hwlasllhSWvXUbuVYSgVIgjCJKjLgiz2nzY0xCgQTkJKlfQ57g4Q/exec",
                {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify({
                        name: rsvpName,
                        message: rsvpMessage,
                    }),
                }
            );

            setRsvpSubmitted(true);
            setShowRsvpDialog(true); // show dialog


        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setRsvpLoading(false); // 🔹 STOP LOADING
        }
    };


    return (
        <div
            className="bg-[#FFFBF5] text-[#4A4238] font-serif relative"
            style={{minHeight: "var(--app-height)"}}
        >

            {/* Audio */}
            <audio ref={audioRef} src="/audio/fathiha.mp3" loop/>

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
            <nav
                className="fixed w-full z-40 bg-white/70 backdrop-blur border-b border-[#D4AF37]/20 px-4 md:px-6 py-4"
                style={{top: "env(safe-area-inset-top)"}}
            >
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h2
                        className="text-xl italic cursor-pointer"
                        onClick={() => handleTabClick('home')}
                    >
                        <span className="shimmer-text">Shazeen</span>
                        <span className="mx-1 text-[#a6a6a6]">&</span>
                        <span className="shimmer-text">Shimra</span>
                    </h2>


                    {/* Desktop */}
                    <div className="hidden md:flex space-x-2">
                        <TabButton id="home" label="Home" icon={Home}/>
                        <TabButton id="invitation" label="Invitation" icon={MailOpen}/>
                        <TabButton id="rsvp" label="RSVP" icon={Heart}/>
                        <TabButton id="location" label="Location" icon={MapPin}/>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="flex flex-col items-center space-y-2 mt-2 md:hidden">
                        <TabButton id="home" label="Home" icon={Home}/>
                        <TabButton id="invitation" label="Invitation" icon={MailOpen}/>
                        <TabButton id="rsvp" label="RSVP" icon={Heart}/>
                        <TabButton id="location" label="Location" icon={MapPin}/>
                    </div>
                )}
            </nav>

            {/* MAIN CONTENT */}
            <main
                className="px-4 md:px-6 lg:px-12 transition-all duration-300"
                style={{paddingTop: "calc(7rem + env(safe-area-inset-top))"}}
            >
                {/* HOME */}
                {activeTab === 'home' && fade && (
                    <section
                        className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 px-2 md:px-0 transition-opacity duration-300 opacity-100">
                        <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.3em] text-[#D4AF37] opacity-80 font-light">
                            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                        </p>
                        <span
                            className="border-y border-[#D4AF37] px-4 py-1 text-[#D4AF37] text-xs tracking-[0.3em] uppercase">
              Together with their families
            </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light italic leading-tight">
                            <span className="shimmer-text">Shazeen</span>
                            <span className="text-[#a6a6a6] mx-2 md:mx-4">&</span>
                            <span className="shimmer-text">Shimra</span>
                        </h1>

                        <p className="italic opacity-70 text-lg md:text-xl">
                            Cordially invite you to celebrate their
                            <span className="block text-2xl md:text-3xl mt-2 not-italic">Wedding Function</span>
                        </p>
                        <div className="mt-6 md:mt-8 flex flex-col items-center gap-2">
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-3xl md:text-4xl lg:text-5xl text-[#D4AF37]">
                                    {weddingDate}
                                </p>

                                <p className="text-sm md:text-base tracking-widest uppercase opacity-70">
                                    {weddingTime}
                                </p>
                            </div>


                            <p className="uppercase text-xs md:text-sm tracking-widest">
                                Pearl Grand Banquet Hall
                            </p>

                            {/* ROUTE BUTTON */}
                            <button
                                onClick={() => handleTabClick('location')}
                                className="mt-1 px-4 py-1.5
               border border-[#D4AF37]
               text-[#D4AF37]
               rounded-full
               text-[10px] md:text-xs
               uppercase tracking-widest
               hover:bg-[#D4AF37]
               hover:text-white
               transition-all duration-300"
                            >
                                Route to Venue
                            </button>
                            {/* RSVP BUTTON */}
                            <button
                                onClick={() => handleTabClick('rsvp')}
                                className="inline-flex items-center justify-center
               px-8 py-3 md:px-10 md:py-4
               border-2 border-[#D4AF37]
               text-[#D4AF37]
               rounded-full
               uppercase tracking-widest
               text-xs md:text-sm
               font-bold
               hover:bg-[#D4AF37]
               hover:text-white
               transition-all duration-300"
                            >
                                <Heart className="mr-2" size={16}/>
                                RSVP Now
                            </button>
                        </div>
                        <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3">
                            {countdown.expired ? (
                                <span
                                    className="w-full text-center text-[#D4AF37] font-bold text-lg sm:text-xl md:text-2xl">
                  Wedding Day is Here!
                </span>
                            ) : (
                                ['days', 'hours', 'minutes', 'seconds'].map(unit => (
                                    <div key={unit}
                                         className="flex-1 min-w-[60px] max-w-[120px] bg-[#D4AF37]/20 border border-[#D4AF37] rounded-2xl px-3 py-2 flex flex-col items-center justify-center">
                                        <span
                                            className="text-xl sm:text-2xl md:text-3xl font-bold text-[#D4AF37]">{countdown[unit]}</span>
                                        <span
                                            className="uppercase text-[8px] sm:text-xs md:text-sm tracking-widest text-[#4A4238]/70">{unit}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        {/* More Details Button */}
                        <button onClick={() => handleTabClick('invitation')}
                                className="flex flex-col items-center text-[#D4AF37] mt-4 md:mt-6">
                            <span className="text-xs uppercase tracking-widest font-bold">More Details</span>
                            <ChevronDown className="animate-bounce mt-1 md:mt-2"/>
                        </button>

                        {/* Wedding Dua under More Details */}
                        <p className="mt-2 text-[10px] sm:text-xs tracking-[0.3em] text-[#D4AF37] opacity-70 font-light">
                            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْر
                        </p>

                    </section>
                )}

                {/* INVITATION */}
                {activeTab === 'invitation' && fade && (
                    <section
                        className="max-w-4xl mx-auto bg-white/50 rounded-3xl p-6 md:p-10 shadow-xl space-y-6 md:space-y-10 text-center transition-opacity duration-300 opacity-100">
                        <Heart className="mx-auto text-[#D4AF37]" size={40} md={48}/>
                        <h2 className="text-3xl md:text-5xl italic font-light">The Invitation</h2>
                        <p className="text-sm md:text-lg opacity-80">
                            We warmly invite you to join us as we begin our journey together.
                            Your presence, prayers, and blessings mean everything to us.
                        </p>
                        <div className="grid gap-4 md:gap-8 md:grid-cols-3 border-y py-6 md:py-8">
                            <div>
                                <MapPin className="mx-auto text-[#D4AF37]"/>
                                <p className="uppercase text-xs mt-1 md:mt-2 tracking-widest">Location</p>
                                <p className="text-sm md:text-base">Pearl Grand Banquet Hall</p>
                            </div>
                            <div>
                                <Calendar className="mx-auto text-[#D4AF37]"/>
                                <p className="uppercase text-xs mt-1 md:mt-2 tracking-widest">Date</p>
                                <p className="text-sm md:text-base">21st May 2026</p>
                            </div>
                            <div>
                                <Clock className="mx-auto text-[#D4AF37]"/>
                                <p className="uppercase text-xs mt-1 md:mt-2 tracking-widest">Time</p>
                                <p className="text-sm md:text-base">{weddingTime}</p>
                            </div>
                        </div>
                        {/* ACTION BUTTONS */}
                        <div className="flex flex-col items-center gap-4 pt-2 md:pt-4">

                            {/* RSVP BUTTON */}
                            <button
                                onClick={() => handleTabClick('rsvp')}
                                className="inline-flex items-center justify-center
               px-8 py-3 md:px-10 md:py-4
               border-2 border-[#D4AF37]
               text-[#D4AF37]
               rounded-full
               uppercase tracking-widest
               text-xs md:text-sm
               font-bold
               hover:bg-[#D4AF37]
               hover:text-white
               transition-all duration-300"
                            >
                                <Heart className="mr-2" size={16}/>
                                RSVP Now
                            </button>

                            {/* UPLOAD MEMORIES */}
                            <a
                                href={googleDriveLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center
               px-8 py-3 md:px-10 md:py-4
               bg-[#D4AF37]
               text-white
               rounded-full
               uppercase tracking-widest
               text-xs md:text-sm
               font-bold"
                            >
                                <Upload className="mr-2"/>
                                Upload Memories
                            </a>

                        </div>

                    </section>
                )}

                {/* RSVP */}
                {activeTab === 'rsvp' && fade && (
                    <section
                        className="max-w-2xl mx-auto bg-white/50 rounded-3xl p-6 md:p-10 shadow-xl space-y-6 text-center overflow-y-auto"
                        style={{
                            maxHeight: "calc(var(--app-height) - 10rem)",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >

                        <h2 className="text-3xl md:text-5xl italic font-light">RSVP</h2>
                        <p className=" rounded-lg px-4 py-3">Please let us know if you will be
                            attending.</p>
                        <form onSubmit={handleRsvpSubmit} className="flex flex-col space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={rsvpName}
                                onFocus={(e) => {
                                    setTimeout(() => {
                                        e.target.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                        });
                                    }, 300);
                                }}

                                onChange={(e) => {
                                    setRsvpName(e.target.value);
                                    setNameError("");
                                }}

                                className="border border-[#D4AF37] rounded-lg px-4 py-2 text-sm md:text-base"
                            />
                            {nameError && (
                                <p className="text-red-600 text-xs md:text-sm text-left">
                                    {nameError}
                                </p>
                            )}

                            <textarea placeholder="Message (optional)" value={rsvpMessage}
                                      onChange={(e) => setRsvpMessage(e.target.value)}
                                      className="border border-[#D4AF37] rounded-lg px-4 py-2 text-sm md:text-base resize-none"/>
                            <button
                                type="submit"
                                disabled={rsvpLoading}
                                className={`rounded-full px-6 py-2 md:px-8 md:py-3 uppercase tracking-widest font-bold transition
    ${rsvpLoading
                                    ? "bg-[#D4AF37]/60 cursor-not-allowed"
                                    : "bg-[#D4AF37] hover:bg-[#b9922f] text-white"
                                }`}
                            >
                                {rsvpLoading ? (
                                    <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Submitting...
        </span>
                                ) : (
                                    "Submit RSVP"
                                )}
                            </button>

                        </form>

                    </section>
                )}

                {/* LOCATION */}
                {activeTab === 'location' && fade && (
                    <section
                        className="max-w-4xl mx-auto space-y-6 md:space-y-10 text-center px-2 md:px-0 transition-opacity duration-300 opacity-100">
                        <h2 className="text-3xl md:text-5xl italic">Find Your Way</h2>
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
                            <div
                                className="flex-1 bg-white/50 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col items-center justify-center space-y-2 md:space-y-4 min-h-[300px]">
                                <MapPin className="text-[#D4AF37]" size={32}/>
                                <h3 className="text-lg md:text-xl font-semibold">Pearl Grand Banquet Hall</h3>
                                <p className="text-sm md:text-base opacity-80">{locationAddress}</p>
                                <a href={`tel:${contactNumber}`}
                                   className="flex items-center space-x-2 mt-2 text-[#D4AF37] font-semibold">
                                    <Phone size={16}/><span>{contactNumber}</span>
                                </a>
                            </div>
                            <div className="flex-1 relative overflow-hidden rounded-3xl shadow-xl min-h-[300px]">

                                {/* MAP LOADER */}
                                {mapLoading && (
                                    <div
                                        className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
                                        <MapPin className="text-[#D4AF37] animate-bounce mb-2" size={28}/>
                                        <p className="text-xs uppercase tracking-widest opacity-70">
                                            Loading map...
                                        </p>
                                    </div>
                                )}

                                <iframe
                                    title="Wedding Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5946305073207!2d79.9692585!3d6.572735099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae237006541d533%3A0x83c56abe1a801459!2sPearl%20Grand%20Banquet%20Hall!5e0!3m2!1sen!2slk!4v1769275470162!5m2!1sen!2slk"
                                    className="absolute inset-0 w-full h-full"
                                    style={{border: 0}}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    onLoad={() => setMapLoading(false)} // ✅ KEY LINE
                                />
                            </div>

                        </div>
                    </section>
                )}
            </main>

            {/* MUSIC BUTTON */}
            <button
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label="Toggle music"
                className="
    fixed
    right-4 md:right-6
    z-50
    w-12 h-12
    flex items-center justify-center
    rounded-full
    border-2 border-[#D4AF37]
    bg-white/80 backdrop-blur
    text-[#5C3A2E]
    active:scale-95
    transition-all
  "
                style={{
                    bottom: "calc(3rem + env(safe-area-inset-bottom))",
                }}
            >
                {isPlaying ? (
                    <Music2 className="w-5 h-5 animate-pulse" />
                ) : (
                    <Music className="w-5 h-5" />
                )}

                {/* ON / OFF DOT */}
                <span
                    className="
      absolute -top-1 -right-1
      w-4 h-4
      rounded-full
      bg-[#D4AF37]
      text-[7px]
      text-white
      font-bold
      flex items-center justify-center
    "
                >
    {isPlaying ? "ON" : "OFF"}
  </span>
            </button>

            {/* FOOTER */}
            <footer className="py-4 md:py-6 text-center text-xs tracking-widest opacity-40">
                &copy; 2026 Mohamed Shazeen. All Rights Reserved.
            </footer>

            <style>{`
  .shimmer-text {
    background: linear-gradient(
      110deg,
      #b9922f 20%,
      #fff2b2 40%,
      #d4af37 60%,
      #b9922f 80%
    );
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: shimmer 3s linear infinite;
  }

  @keyframes shimmer {
    to {
      background-position: -200% center;
    }
  }
  @keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

/* iOS SAFE VIEWPORT FIX */
:root {
  --app-height: 100vh;
}

@supports (height: 100dvh) {
  :root {
    --app-height: 100dvh;
  }
}

html, body {
  height: 100%;
  overflow-x: hidden;
  -webkit-text-size-adjust: 100%;
}
input,
textarea,
select,
button {
  font-size: 16px !important;
  line-height: 1.4;
}

@supports (-webkit-touch-callout: none) {
  input,
  textarea,
  select {
    font-size: 16px !important;
  }
}



`}</style>
            {/* RSVP SUCCESS DIALOG */}
            {showRsvpDialog && (
                <div
                    className="fixed z-50 flex justify-center bg-black/60 px-4"
                    style={{
                        inset: 0,
                        paddingTop: "env(safe-area-inset-top)",
                        paddingBottom: "env(safe-area-inset-bottom)",
                        alignItems: "center",
                    }}
                >

                    <div
                        className="bg-[#FFFBF5] rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 text-center animate-fadeIn">

                        <div
                            className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/20 mb-4">
                            <Heart className="text-[#D4AF37]" size={32}/>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-light italic mb-3">
                            RSVP Submitted
                        </h3>

                        <p className="text-base md:text-lg font-medium mb-1">
                            Thank you, <span className="text-[#D4AF37]">{rsvpName}</span>!
                        </p>

                        <p className="text-sm md:text-base opacity-80 mb-6">
                            We truly appreciate you confirming your attendance.
                            We look forward to celebrating this special day with you.
                        </p>

                        <button
                            onClick={() => {
                                setShowRsvpDialog(false);
                                setRsvpName("");
                                setRsvpMessage("");
                            }}
                            className="px-8 py-3 rounded-full bg-[#D4AF37] text-white uppercase tracking-widest text-xs md:text-sm font-bold hover:bg-[#b9922f] transition"
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}


        </div>
    );
}

export default App;