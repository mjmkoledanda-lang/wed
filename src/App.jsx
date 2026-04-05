import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
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

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.35
        }
    }
};

const item = (delay = 0) => ({
    hidden: { opacity: 0, y: -80 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            delay: delay,
            ease: [0.22, 1, 0.36, 1]
        }
    }
});

function App() {
    const [activeTab, setActiveTab] = useState('home');
    const [isPlaying, setIsPlaying] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [rsvpName, setRsvpName] = useState('');
    const [rsvpMessage, setRsvpMessage] = useState('');
    const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
    const [fade, setFade] = useState(true);
    const audioRef = useRef(null);
    const [mapLoading, setMapLoading] = useState(true);
    const [introStarted, setIntroStarted] = useState(false);
    const [introFinished, setIntroFinished] = useState(false);
    const videoRef = useRef(null);
    const [videoTime, setVideoTime] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [startHomeAnimation, setStartHomeAnimation] = useState(false);


    const [typedText, setTypedText] = useState("");

    const fullText = `Together with their families

Shazeen & Shimra

Cordially invite you to celebrate their
Wedding Function

May 21, 2026
08:00 PM
Pearl Grand Banquet Hall`;

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


    useEffect(() => {
        if (videoTime > 1 && videoTime < 3) {
            let i = 0;
            const interval = setInterval(() => {
                setTypedText(fullText.slice(0, i));
                i++;
                if (i > fullText.length) clearInterval(interval);
            }, 25);

            return () => clearInterval(interval);
        }
    }, [videoTime]);

    // Audio play/pause
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.play();
            else audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        document.body.style.overflow = introFinished ? "auto" : "hidden";
    }, [introFinished]);

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


    const handleRsvpSubmit = async (e) => {
        e.preventDefault();
        if (!rsvpName) return;

        try {
            await fetch(
                "https://script.google.com/macros/s/AKfycbzzOwmgSzvXARa582hwlasllhSWvXUbuVYSgVIgjCJKjLgiz2nzY0xCgQTkJKlfQ57g4Q/exec",
                {
                    method: "POST",
                    mode: "no-cors", // ✅ IMPORTANT
                    body: JSON.stringify({
                        name: rsvpName,
                        message: rsvpMessage,
                    }),
                }
            );

            // ✅ Assume success (Google Script executed)
            setRsvpSubmitted(true);
            setRsvpName("");
            setRsvpMessage("");

        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#E8D1B5] text-[#4A4238] font-serif relative">

            {/* 🎬 REEL-STYLE ENVELOPE INTRO */}
            {!introFinished && (
                <div
                    className={`fixed inset-0 z-50 bg-[#f8f5f2] transition-opacity duration-700 ${
                        fadeOut ? "opacity-0" : "opacity-100"
                    }`}
                    onClick={() => {
                        if (!introStarted) {
                            setIntroStarted(true);
                            videoRef.current.currentTime = 0.05;
                            videoRef.current.play();
                        }
                    }}
                >
                    {/* 🎥 VIDEO */}
                    <video
                        ref={videoRef}
                        src="/video/envelope.mp4"
                        className="w-full h-full object-cover"
                        playsInline
                        muted
                        preload="auto"
                        controls={false}
                        disablePictureInPicture
                        style={{ pointerEvents: "none" }}
                        onTimeUpdate={() => {
                            setVideoTime(videoRef.current.currentTime);
                        }}
                        onLoadedData={() => {
                            videoRef.current.pause();
                            videoRef.current.currentTime = 0.05;
                            videoRef.current.playbackRate = 0.7; // try 0.6 or 0.5 for more cinematic
                        }}
                        onEnded={() => {

                            // ⏸️ Pause at last frame
                            videoRef.current.pause();

                            // ⏳ Wait 1 second before fading
                            setTimeout(() => {

                                setFadeOut(true);

                                setTimeout(() => {
                                    setIntroFinished(true);

                                    setTimeout(() => {
                                        setStartHomeAnimation(true);
                                    }, 300);

                                    if (audioRef.current) {
                                        audioRef.current.play();
                                        setIsPlaying(true);
                                    }

                                }, 600);

                            }, 2000); // 👈 1 second pause here
                        }}
                    />

                    {videoTime > 3 && videoTime < 6 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                            <div className="w-[85%] md:w-[700px] text-center px-4 md:px-10 py-6 md:py-10">

                                {/* LINE 1 */}
                                <motion.p
                                    initial={{ opacity: 0, y: -40, filter: "blur(6px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ duration: 0.8, delay: 0 }}
                                    className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#8c7a5b] mb-4"
                                >
                                    Together with their families
                                </motion.p>

                                {/* LINE 2 */}
                                <motion.h1
                                    initial={{ opacity: 0, y: -50, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                    className="text-3xl md:text-6xl italic font-light text-[#5a4b3a] leading-tight"
                                >
                                    Shazeen <span className="text-[#D4AF37]">&</span> Shimra
                                </motion.h1>

                                {/* LINE 3 */}
                                <motion.p
                                    initial={{ opacity: 0, y: -40, filter: "blur(6px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ duration: 0.8, delay: 1.2 }}
                                    className="text-sm md:text-lg mt-3 text-[#6b5c4d]"
                                >
                                    Cordially invite you to celebrate their
                                </motion.p>

                                {/* LINE 4 */}
                                <motion.p
                                    initial={{ opacity: 0, y: -40, filter: "blur(6px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ duration: 0.8, delay: 1.8 }}
                                    className="text-xl md:text-3xl mt-1 font-medium text-[#5a4b3a]"
                                >
                                    Wedding Function
                                </motion.p>

                                {/* LINE 5 */}
                                <motion.p
                                    initial={{ opacity: 0, y: -50, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ duration: 1, delay: 2.4 }}
                                    className="text-[#D4AF37] text-2xl md:text-4xl mt-5 font-semibold"
                                >
                                    May 21, 2026
                                </motion.p>

                                {/* LINE 6 */}
                                <motion.p
                                    initial={{ opacity: 0, y: -30, filter: "blur(5px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ duration: 0.8, delay: 3 }}
                                    className="text-xs md:text-sm tracking-widest text-[#8c7a5b] mt-2"
                                >
                                    08:00 PM
                                </motion.p>

                                {/* LINE 7 */}
                                <motion.p
                                    initial={{ opacity: 0, y: -30, filter: "blur(5px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ duration: 0.8, delay: 3.6 }}
                                    className="uppercase text-[10px] md:text-xs tracking-[0.3em] text-[#6b5c4d] mt-3"
                                >
                                    Pearl Grand Banquet Hall
                                </motion.p>

                            </div>
                        </div>
                    )}
                    {/* ✨ TAP TEXT */}
                    {!introStarted && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[180px]">
                            <p className="tracking-[0.3em] uppercase">Tap to Open</p>
                            <ChevronDown className="animate-bounce mt-3"/>
                        </div>
                    )}
                </div>
            )}

            {/* Audio */}
            <audio ref={audioRef} src="/audio/fathiha.mp3" loop />



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
                    <motion.section
                        initial="hidden"
                        animate="visible"
                        className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 px-2"
                    >

                        {/* LINE 1 */}
                        <motion.span
                            initial={{ opacity: 0, y: -60 }}
                            animate={startHomeAnimation ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0 }}
                            className="border-y border-[#D4AF37] px-4 py-1 text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
                        >
                            Together with their families
                        </motion.span>

                        {/* LINE 2 */}
                        <motion.h1
                            initial={{ opacity: 0, y: -70 }}
                            animate={startHomeAnimation ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light italic"
                        >
                            Shazeen <span className="text-[#D4AF37] mx-2">&</span> Shimra
                        </motion.h1>

                        {/* LINE 3 */}
                        <motion.p
                            initial={{ opacity: 0, y: -50 }}
                            animate={startHomeAnimation ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="italic opacity-70 text-lg md:text-xl"
                        >
                            Cordially invite you to celebrate their
                            <span className="block text-2xl md:text-3xl mt-2 not-italic">
                Wedding Function
            </span>
                        </motion.p>

                        {/* LINE 4 */}
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={startHomeAnimation ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <p className="text-3xl md:text-4xl text-[#D4AF37]">
                                {weddingDate}
                            </p>
                            <p className="uppercase text-xs tracking-widest opacity-70">
                                {weddingTime}
                            </p>
                            <p className="uppercase text-xs tracking-widest">
                                Pearl Grand Banquet Hall
                            </p>
                        </motion.div>

                        {/* LINE 5 */}
                        <motion.div
                            initial={{ opacity: 0, y: -40 }}
                            animate={startHomeAnimation ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 1.2 }}
                            className="flex flex-wrap justify-center gap-3 mt-4"
                        >
                            {['days', 'hours', 'minutes', 'seconds'].map(unit => (
                                <div key={unit} className="bg-[#D4AF37]/20 border border-[#D4AF37] rounded-xl px-3 py-2 text-center">
                                    <p className="text-lg font-bold text-[#D4AF37]">{countdown[unit]}</p>
                                    <p className="text-[10px] uppercase">{unit}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* LINE 6 */}
                        <motion.button
                            initial={{ opacity: 0, y: -40 }}
                            animate={startHomeAnimation ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 1.5 }}
                            onClick={() => handleTabClick('rsvp')}
                            className="mt-6 px-8 py-3 bg-[#D4AF37] text-white rounded-full uppercase tracking-widest text-xs md:text-sm font-bold shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            RSVP Now
                        </motion.button>

                        {/* LINE 7 */}
                        <motion.button
                            initial={{ opacity: 0, y: -40 }}
                            animate={startHomeAnimation ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 1.8 }}
                            onClick={() => handleTabClick('location')}
                            className="px-4 py-1.5 border border-[#D4AF37] text-[#D4AF37] rounded-full text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition"
                        >
                            Route to Venue
                        </motion.button>

                        {/* LINE 8 */}
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={startHomeAnimation ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 2.1 }}
                            onClick={() => handleTabClick('invitation')}
                            className="flex flex-col items-center text-[#D4AF37] cursor-pointer"
                        >
            <span className="text-xs uppercase tracking-widest font-bold">
                More Details
            </span>
                            <ChevronDown className="animate-bounce mt-1" />
                        </motion.div>

                    </motion.section>
                )}

                {activeTab === 'invitation' && fade && (
                    <motion.section
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl mx-auto bg-white/50 rounded-3xl p-6 md:p-10 shadow-xl space-y-6 md:space-y-10 text-center"
                    >

                        {/* LINE 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: -60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0 }}
                        >
                            <Heart className="mx-auto text-[#D4AF37]" size={40} />
                        </motion.div>

                        {/* LINE 2 */}
                        <motion.h2
                            initial={{ opacity: 0, y: -70 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-3xl md:text-5xl italic font-light"
                        >
                            The Invitation
                        </motion.h2>

                        {/* LINE 3 */}
                        <motion.p
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="text-sm md:text-lg opacity-80"
                        >
                            We warmly invite you to join us as we begin our journey together.
                            Your presence, prayers, and blessings mean everything to us.
                        </motion.p>

                        {/* LINE 4 - CARDS */}
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            className="grid gap-4 md:gap-8 md:grid-cols-3 border-y py-6 md:py-8"
                        >

                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 1.2 }}
                            >
                                <MapPin className="mx-auto text-[#D4AF37]" />
                                <p className="uppercase text-xs mt-1 md:mt-2 tracking-widest">Location</p>
                                <p className="text-sm md:text-base">Pearl Grand Banquet Hall</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 1.4 }}
                            >
                                <Calendar className="mx-auto text-[#D4AF37]" />
                                <p className="uppercase text-xs mt-1 md:mt-2 tracking-widest">Date</p>
                                <p className="text-sm md:text-base">21st May 2026</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 1.6 }}
                            >
                                <Clock className="mx-auto text-[#D4AF37]" />
                                <p className="uppercase text-xs mt-1 md:mt-2 tracking-widest">Time</p>
                                <p className="text-sm md:text-base">{weddingTime}</p>
                            </motion.div>

                        </motion.div>

                        {/* LINE 5 - BUTTONS */}
                        <motion.div
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.9 }}
                            className="flex flex-col items-center gap-4 pt-2 md:pt-4"
                        >

                            <motion.button
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 2.2 }}
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
                                <Heart className="mr-2" size={16} />
                                RSVP Now
                            </motion.button>

                            <motion.a
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 2.4 }}
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
                                <Upload className="mr-2" />
                                Upload Memories
                            </motion.a>

                        </motion.div>

                    </motion.section>
                )}
                {/* RSVP */}
                {activeTab === 'rsvp' && fade && (
                    <motion.section
                        initial="hidden"
                        animate="visible"
                        className="max-w-2xl mx-auto bg-white/50 rounded-3xl p-6 md:p-10 shadow-xl space-y-6 text-center"
                    >

                        {/* LINE 1 */}
                        <motion.h2
                            initial={{ opacity: 0, y: -60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0 }}
                            className="text-3xl md:text-5xl italic font-light"
                        >
                            RSVP
                        </motion.h2>

                        {/* LINE 2 */}
                        <motion.p
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-sm md:text-base opacity-80"
                        >
                            Please let us know if you will be attending.
                        </motion.p>

                        {/* LINE 3 (SUCCESS MESSAGE) */}
                        {rsvpSubmitted && (
                            <motion.p
                                initial={{ opacity: 0, y: -40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                                className="text-green-600 font-semibold"
                            >
                                RSVP submitted successfully!
                            </motion.p>
                        )}

                        {/* LINE 4 - FORM */}
                        <motion.form
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            onSubmit={handleRsvpSubmit}
                            className="flex flex-col space-y-4"
                        >

                            {/* INPUT */}
                            <motion.input
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.9 }}
                                type="text"
                                placeholder="Your Name"
                                value={rsvpName}
                                onChange={(e) => setRsvpName(e.target.value)}
                                className="border border-[#D4AF37] rounded-lg px-4 py-2 text-sm md:text-base focus:outline-none focus:ring-2 ring-[#D4AF37]/40"
                                required
                            />

                            {/* TEXTAREA */}
                            <motion.textarea
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 1.1 }}
                                placeholder="Message (optional)"
                                value={rsvpMessage}
                                onChange={(e) => setRsvpMessage(e.target.value)}
                                className="border border-[#D4AF37] rounded-lg px-4 py-2 text-sm md:text-base resize-none focus:outline-none focus:ring-2 ring-[#D4AF37]/40"
                            />

                            {/* BUTTON */}
                            <motion.button
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 1.3 }}
                                type="submit"
                                className="bg-[#D4AF37] text-white rounded-full px-6 py-2 md:px-8 md:py-3 uppercase tracking-widest font-bold hover:bg-[#b9922f] hover:scale-105 transition-all duration-300 shadow-md"
                            >
                                Submit RSVP
                            </motion.button>

                        </motion.form>

                    </motion.section>
                )}

                {/* LOCATION */}
                {activeTab === 'location' && fade && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-4xl mx-auto space-y-6 md:space-y-10 text-center px-2 md:px-0"
                    >

                        {/* LINE 1 - TITLE */}
                        <motion.h2
                            initial={{ opacity: 0, y: -60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0 }}
                            className="text-3xl md:text-5xl italic"
                        >
                            Find Your Way
                        </motion.h2>

                        {/* LINE 2 - MAIN CONTAINER */}
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch"
                        >

                            {/* LEFT CARD */}
                            <motion.div
                                initial={{ opacity: 0, y: -40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="flex-1 bg-white/50 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col items-center justify-center space-y-2 md:space-y-4 min-h-[300px]"
                            >
                                <MapPin className="text-[#D4AF37]" size={32} />

                                <h3 className="text-lg md:text-xl font-semibold">
                                    Pearl Grand Banquet Hall
                                </h3>

                                <p className="text-sm md:text-base opacity-80">
                                    {locationAddress}
                                </p>

                                <a
                                    href={`tel:${contactNumber}`}
                                    className="flex items-center space-x-2 mt-2 text-[#D4AF37] font-semibold"
                                >
                                    <Phone size={16} />
                                    <span>{contactNumber}</span>
                                </a>
                            </motion.div>

                            {/* RIGHT MAP */}
                            <motion.div
                                initial={{ opacity: 0, y: -40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                                className="flex-1 relative overflow-hidden rounded-3xl shadow-xl min-h-[300px]"
                            >

                                {/* MAP LOADER */}
                                {mapLoading && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
                                        <MapPin className="text-[#D4AF37] animate-bounce mb-2" size={28} />
                                        <p className="text-xs uppercase tracking-widest opacity-70">
                                            Loading map...
                                        </p>
                                    </div>
                                )}

                                <iframe
                                    title="Wedding Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5946305073207!2d79.9692585!3d6.572735099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae237006541d533%3A0x83c56abe1a801459!2sPearl%20Grand%20Banquet%20Hall!5e0!3m2!1sen!2slk!4v1769275470162!5m2!1sen!2slk"
                                    className="absolute inset-0 w-full h-full"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    onLoad={() => setMapLoading(false)}
                                />
                            </motion.div>

                        </motion.div>

                    </motion.section>
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