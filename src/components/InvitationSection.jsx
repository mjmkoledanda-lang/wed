import { Heart, MapPin, Calendar, Clock, Upload } from "lucide-react";

const InvitationSection = ({ weddingTime, googleDriveLink }) => (
    <section className="max-w-4xl mx-auto py-12">
        <div className="bg-white/40 p-12 rounded-[3rem] shadow-xl">
            <div className="text-center space-y-10">
                <Heart className="mx-auto text-[#D4AF37]" size={48} />
                <h2 className="text-5xl italic">The Invitation</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <div><MapPin /> At Our Residence</div>
                    <div><Calendar /> 8th September 2024</div>
                    <div><Clock /> {weddingTime}</div>
                </div>

                <a href={googleDriveLink} target="_blank"
                   className="inline-flex items-center gap-3 bg-[#D4AF37] text-white px-8 py-4 rounded-full">
                    <Upload /> Upload Memories
                </a>
            </div>
        </div>
    </section>
);

export default InvitationSection;
