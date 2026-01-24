import { Home, Phone } from "lucide-react";

const LocationSection = ({ locationAddress, contactNumber, mapEmbedUrl }) => (
    <section className="max-w-5xl mx-auto py-12">
        <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div><Home /> {locationAddress}</div>
                <a href={`tel:${contactNumber}`}><Phone /> {contactNumber}</a>
            </div>

            <iframe
                src={mapEmbedUrl}
                className="lg:col-span-3 h-[500px] w-full rounded-3xl"
                loading="lazy"
            />
        </div>
    </section>
);

export default LocationSection;
