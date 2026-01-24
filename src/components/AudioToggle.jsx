import { Music, Music2 } from "lucide-react";

const AudioToggle = ({ isPlaying, setIsPlaying }) => (
    <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-white rounded-full shadow-xl"
    >
        {isPlaying ? <Music2 /> : <Music />}
    </button>
);

export default AudioToggle;
