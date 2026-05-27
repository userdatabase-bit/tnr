import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { ADDRESS_LINE1, ADDRESS_LINE2 } from '../constants';

// ─── Custom marker icon ──────────────────────────────────────────────────────

const tnrIcon = L.divIcon({
  className: 'custom-marker-wrapper',
  html: `
    <div style="position:relative; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;">
      <div style="position:absolute; width:40px; height:40px; border-radius:50%; border:2px solid #E8821A; animation: pulse-ring 2s ease-out infinite; top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none;"></div>
      <svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:relative; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));">
        <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z" fill="#E8821A"/>
        <circle cx="14" cy="14" r="6" fill="white"/>
      </svg>
    </div>
  `,
  iconSize: [60, 60],
  iconAnchor: [30, 48],
  popupAnchor: [0, -44],
});

// ─── Coordinates for TNR Solutions ───────────────────────────────────────────
// Site C, Surajpur Industrial Area, Greater Noida, UP

const TNR_LOCATION: [number, number] = [28.5071, 77.5213];
const MAP_ZOOM = 15;

export default function LocationMap() {
  const [mapInteractive, setMapInteractive] = useState(false);

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${ADDRESS_LINE1}, ${ADDRESS_LINE2}`
  )}`;

  return (
    <section id="location" className="relative py-16 md:py-20 bg-offwhite overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1B2A5E 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-4">
            OUR LOCATION
          </span>
          <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Visit Our{' '}
            <span className="text-orange">Facility</span>
          </h2>
          <p className="font-body text-grey-dark text-sm sm:text-base max-w-lg mx-auto mt-3 leading-relaxed">
            Conveniently located in the Surajpur Industrial Area — we serve all of Delhi NCR with premium packaging solutions.
          </p>
        </motion.div>

        {/* Map card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-navy/10 bg-white">
            {/* Map container */}
            <div className="h-[280px] sm:h-[340px] md:h-[380px] w-full">
              <MapContainer
                center={TNR_LOCATION}
                zoom={MAP_ZOOM}
                zoomControl={false}
                scrollWheelZoom={mapInteractive}
                dragging={mapInteractive}
                touchZoom={mapInteractive}
                doubleClickZoom={mapInteractive}
                boxZoom={mapInteractive}
                keyboard={mapInteractive}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                <Marker position={TNR_LOCATION} icon={tnrIcon}>
                  <Popup>
                    <div className="text-center py-1 px-1 min-w-[180px]">
                      <div className="font-heading font-bold text-navy text-sm">TNR Solutions</div>
                      <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                        {ADDRESS_LINE1}
                      </div>
                      <div className="text-xs text-gray-500 leading-relaxed">
                        {ADDRESS_LINE2}
                      </div>
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-xs font-heading font-semibold text-orange hover:text-orange-dark transition-colors"
                      >
                        <ExternalLink size={12} />
                        Open in Google Maps
                      </a>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>

              {/* Tap to interact overlay */}
              {!mapInteractive && (
                <div
                  className="absolute inset-0 z-[500] flex items-center justify-center cursor-pointer"
                  onClick={() => setMapInteractive(true)}
                >
                  <div className="absolute inset-0 bg-navy/[0.06]" />
                  <div className="relative flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-navy/10">
                    <MapPin className="w-4 h-4 text-orange" />
                    <span className="font-heading font-semibold text-navy text-[11px] sm:text-xs tracking-wider">
                      TAP TO EXPLORE MAP
                    </span>
                  </div>
                </div>
              )}

              {/* Exit interactive mode */}
              {mapInteractive && (
                <button
                  onClick={() => setMapInteractive(false)}
                  className="absolute top-3 right-3 z-[600] flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-navy/10 text-navy font-heading font-semibold text-[10px] tracking-wider hover:bg-white transition-colors"
                >
                  <Navigation className="w-3 h-3" /> DONE
                </button>
              )}
            </div>

            {/* Address bar below map */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 bg-white border-t border-navy/5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-semibold text-navy text-sm">{ADDRESS_LINE1}</p>
                  <p className="font-body text-grey text-xs">{ADDRESS_LINE2}</p>
                </div>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-navy hover:bg-navy-light text-white font-heading font-semibold text-xs rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <ExternalLink size={14} />
                Get Directions
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
