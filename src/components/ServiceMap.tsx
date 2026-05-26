import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, X } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import { useParallaxDrift } from '../hooks/useScrollAnimation';

// Custom divIcon with a large invisible hit area + visible marker
function createMarkerIcon(isActive: boolean) {
  return L.divIcon({
    className: 'custom-marker-wrapper',
    html: `
      <div style="position:relative; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer;">
        <div style="position:absolute; inset:0; border-radius:50%; background:transparent;"></div>
        ${isActive ? `<div style="position:absolute; width:40px; height:40px; border-radius:50%; border:2px solid #E8821A; animation: pulse-ring 2s ease-out infinite; top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none;"></div>` : ''}
        <svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:relative; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
          <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z" fill="${isActive ? '#E8821A' : '#1B2A5E'}"/>
          <circle cx="14" cy="14" r="6" fill="white"/>
        </svg>
      </div>
    `,
    iconSize: [60, 60],
    iconAnchor: [30, 48],
    popupAnchor: [0, -44],
  });
}

const locations = [
  {
    name: 'New Delhi',
    lat: 28.6139,
    lng: 77.2090,
    detail: 'The seat of power — India Gate, Rashtrapati Bhavan & Connaught Place',
    icon: MapPin,
    address: 'New Delhi, Delhi NCR',
  },
  {
    name: 'South Delhi',
    lat: 28.5343,
    lng: 77.2055,
    detail: 'Saket, Hauz Khas & Nehru Place — retail, culture & tech hub',
    icon: MapPin,
    address: 'South Delhi, Delhi NCR',
  },
  {
    name: 'Central Delhi',
    lat: 28.6520,
    lng: 77.2280,
    detail: 'Chandni Chowk, Daryaganj & Kamala Nagar — heritage & trade',
    icon: MapPin,
    address: 'Central Delhi, Delhi NCR',
  },
  {
    name: 'West Delhi',
    lat: 28.6640,
    lng: 77.0750,
    detail: 'Janakpuri, Rajouri Garden & Punjabi Bagh — residential & retail',
    icon: MapPin,
    address: 'West Delhi, Delhi NCR',
  },
  {
    name: 'East Delhi',
    lat: 28.6260,
    lng: 77.2850,
    detail: 'Preet Vihar, Laxmi Nagar & Krishna Nagar — education hub',
    icon: MapPin,
    address: 'East Delhi, Delhi NCR',
  },
  {
    name: 'Gurugram',
    lat: 28.4595,
    lng: 77.0266,
    detail: 'DLF Cyber City, Golf Course Road — corporate & tech capital',
    icon: MapPin,
    address: 'Gurugram, Haryana',
  },
  {
    name: 'Noida',
    lat: 28.5355,
    lng: 77.3910,
    detail: 'Sector 18, Film City & Sector 62 — tech, media & business',
    icon: MapPin,
    address: 'Noida, Uttar Pradesh',
  },
  {
    name: 'Ghaziabad',
    lat: 28.6692,
    lng: 77.4538,
    detail: 'Vaishali, Indirapuram & Kaushambi — residential & commercial',
    icon: MapPin,
    address: 'Ghaziabad, Uttar Pradesh',
  },
  {
    name: 'Faridabad',
    lat: 28.4089,
    lng: 77.3178,
    detail: 'Sector 6, Neharpar & Ballabgarh — industrial & residential',
    icon: MapPin,
    address: 'Faridabad, Haryana',
  },
  {
    name: 'Greater Noida',
    lat: 28.4744,
    lng: 77.5040,
    detail: 'Knowledge Park, Ecotech & Yamuna Expressway — education & manufacturing',
    icon: MapPin,
    address: 'Greater Noida, Uttar Pradesh',
  },
];

const DEFAULT_CENTER: [number, number] = [28.55, 77.22];
const DEFAULT_ZOOM = 10;
const ZOOMED_ZOOM = 12;

function MapController({ activeLocation }: { activeLocation: string | null }) {
  const map = useMap();
  const prevLocation = useRef<string | null>(null);

  useEffect(() => {
    if (activeLocation && activeLocation !== prevLocation.current) {
      const loc = locations.find(l => l.name === activeLocation);
      if (loc) {
        map.flyTo([loc.lat, loc.lng], ZOOMED_ZOOM, { duration: 1.0 });
      }
    } else if (!activeLocation && prevLocation.current) {
      map.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, { duration: 1.0 });
    }
    prevLocation.current = activeLocation;
  }, [activeLocation, map]);

  return null;
}

// Auto-open popup when location is selected
function PopupController({ activeLocation }: { activeLocation: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (!activeLocation) return;
    const loc = locations.find(l => l.name === activeLocation);
    if (!loc) return;

    const timer = setTimeout(() => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          const pos = layer.getLatLng();
          if (Math.abs(pos.lat - loc.lat) < 0.001 && Math.abs(pos.lng - loc.lng) < 0.001) {
            layer.openPopup();
          }
        }
      });
    }, 600);

    return () => clearTimeout(timer);
  }, [activeLocation, map]);

  return null;
}

function MarkerHitArea({ loc, onSelect }: { loc: typeof locations[0]; onSelect: (name: string) => void }) {
  return (
    <Circle
      center={[loc.lat, loc.lng]}
      radius={8000}
      pathOptions={{
        fillOpacity: 0,
        opacity: 0,
        interactive: true,
      }}
      eventHandlers={{
        click: () => onSelect(loc.name),
      }}
    />
  );
}

export default function ServiceMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const driftRef = useParallaxDrift(0.12, 0.08);
  const [mapInteractive, setMapInteractive] = useState(false);

  const handleSelect = useCallback((name: string) => {
    setActiveLocation(prev => prev === name ? null : name);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-40 bg-offwhite overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #1B2A5E 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Parallax decorative shape */}
      <div ref={driftRef} className="absolute top-16 right-8 w-28 h-28 border-2 border-orange/8 rounded-2xl rotate-12 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Real Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-navy/10">
              {/* Responsive map height: short on mobile, tall on desktop */}
              <div className="h-[320px] sm:h-[380px] md:h-[460px] lg:h-[560px] w-full">
                <MapContainer
                  center={DEFAULT_CENTER}
                  zoom={DEFAULT_ZOOM}
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
                  <MapController activeLocation={activeLocation} />
                  <PopupController activeLocation={activeLocation} />

                  {locations.map((loc) => (
                    <MarkerHitArea
                      key={`hit-${loc.name}`}
                      loc={loc}
                      onSelect={handleSelect}
                    />
                  ))}

                  {locations.map((loc) => (
                    <Marker
                      key={loc.name}
                      position={[loc.lat, loc.lng]}
                      icon={createMarkerIcon(activeLocation === loc.name)}
                      eventHandlers={{
                        click: () => handleSelect(loc.name),
                      }}
                    >
                      <Popup>
                        <div className="text-center py-1 px-1">
                          <div className="font-heading font-bold text-navy text-sm">{loc.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{loc.detail}</div>
                          <div className="text-[10px] text-gray-400 mt-1">{loc.address}</div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>

                {/* Tap to interact overlay — blocks scroll hijacking on mobile */}
                {!mapInteractive && (
                  <div
                    className="absolute inset-0 z-[500] flex items-center justify-center cursor-pointer"
                    onClick={() => setMapInteractive(true)}
                  >
                    <div className="absolute inset-0 bg-navy/[0.06]" />
                    <div className="relative flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-navy/10">
                      <svg className="w-4 h-4 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                      </svg>
                      <span className="font-heading font-semibold text-navy text-[11px] sm:text-xs tracking-wider">TAP TO EXPLORE MAP</span>
                    </div>
                  </div>
                )}

                {/* Exit interactive mode */}
                {mapInteractive && (
                  <button
                    onClick={() => setMapInteractive(false)}
                    className="absolute top-3 right-3 z-[600] flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-navy/10 text-navy font-heading font-semibold text-[10px] tracking-wider hover:bg-white transition-colors"
                  >
                    <X className="w-3 h-3" />
                    DONE
                  </button>
                )}
              </div>
            </div>

            {/* Badge — below the map, not overlapping */}
            <div className="mt-4 flex justify-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-navy rounded-full shadow-lg">
                <MapPin className="w-3.5 h-3.5 text-orange" />
                <span className="font-heading font-semibold text-white text-[10px] sm:text-xs tracking-wider">COVERING ALL OF DELHI NCR</span>
              </div>
            </div>
          </motion.div>

          {/* Right: District List */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6"
            >
              OUR REACH
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-6xl leading-tight mb-6 lg:mb-8"
            >
              <span className="text-orange">Delhi NCR</span>{' '}
              District Coverage
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-body text-grey-dark text-base lg:text-lg leading-relaxed mb-6 lg:mb-10"
            >
              Our services span all major districts and cities across the National Capital Region — from the historic heart of Delhi to the booming corporate corridors of Gurugram and Noida.
            </motion.p>

            {/* District cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
              {locations.map((loc, i) => {
                const Icon = loc.icon;
                const isActive = activeLocation === loc.name;
                return (
                  <motion.button
                    key={loc.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    onClick={() => handleSelect(loc.name)}
                    className={`group relative w-full text-left rounded-xl transition-all duration-300 cursor-pointer select-none overflow-hidden ${
                      isActive
                        ? 'bg-white border-2 border-orange/30 shadow-xl shadow-orange/10'
                        : 'bg-white/60 border-2 border-transparent hover:bg-white hover:shadow-lg hover:border-orange/10'
                    }`}
                  >
                    <div className={`absolute top-0 left-0 bottom-0 w-1 rounded-l-xl transition-all duration-300 ${
                      isActive ? 'bg-orange' : 'bg-transparent group-hover:bg-orange/40'
                    }`} />

                    <div className="flex items-center gap-3 p-3 lg:p-4 pl-4 lg:pl-5">
                      <div className={`flex-shrink-0 w-9 h-9 lg:w-11 lg:h-11 rounded-lg lg:rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-orange shadow-lg shadow-orange/30'
                          : 'bg-navy/8 group-hover:bg-navy/12'
                      }`}>
                        <Icon className={`w-4 h-4 lg:w-5 lg:h-5 transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-navy'
                        }`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-heading font-bold text-xs lg:text-sm transition-colors duration-300 ${
                            isActive ? 'text-orange' : 'text-navy'
                          }`}>
                            {loc.name}
                          </span>
                          {isActive && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-orange/10 rounded-full"
                            >
                              <Navigation className="w-2.5 h-2.5 text-orange" />
                              <span className="text-[10px] font-heading font-semibold text-orange tracking-wider">VIEWING</span>
                            </motion.span>
                          )}
                        </div>
                      </div>

                      <div className={`flex-shrink-0 w-7 h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'bg-orange/10' : 'bg-transparent group-hover:bg-navy/5'
                      }`}>
                        {isActive ? (
                          <X className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-orange" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-grey/40 group-hover:text-orange transition-colors" />
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 lg:px-5 pb-3 lg:pb-4 pt-0 ml-12 lg:ml-16">
                            <div className="p-2.5 lg:p-3 bg-offwhite rounded-lg border border-navy/5">
                              <p className="font-body text-grey-dark text-[11px] lg:text-xs leading-relaxed">{loc.detail}</p>
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <MapPin className="w-3 h-3 text-orange flex-shrink-0" />
                                <span className="font-body text-navy/60 text-[10px] lg:text-[11px]">{loc.address}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-3 lg:mt-4 text-[11px] lg:text-xs text-grey font-body flex items-center gap-1.5"
            >
              <MapPin className="w-3 h-3" />
              Tap a district to locate it on the map — tap again to reset
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
