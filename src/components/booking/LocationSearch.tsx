"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Loader2, Navigation } from "lucide-react";
import { toast } from "sonner";

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address: {
    road?: string;
    suburb?: string;
    city?: string;
    state?: string;
    country?: string;
  };
}

export interface LocationValue {
  display: string;  // e.g. "Achli Gate, Batala, Punjab, India"
  lat: number;
  lng: number;
}

interface Props {
  value: LocationValue | null;
  onChange: (val: LocationValue) => void;
  placeholder?: string;
}

export function LocationSearch({ value, onChange, placeholder = "Search any place, landmark, or venue…" }: Props) {
  const [query, setQuery] = useState(value?.display ?? "");
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=6&countrycodes=in`,
        { headers: { "Accept-Language": "en" } }
      );
      const data: NominatimResult[] = await res.json();
      setResults(data);
      setShowDropdown(data.length > 0);
    } catch {
      // silent fail
    } finally {
      setIsSearching(false);
    }
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(q), 350);
  }

  function handleSelect(result: NominatimResult) {
    const val: LocationValue = {
      display: result.display_name,
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
    };
    setQuery(result.display_name);
    setShowDropdown(false);
    setResults([]);
    onChange(val);
  }

  function handleDetectLocation() {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation not supported by your browser.");
      return;
    }
    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
            { headers: { "Accept-Language": "en" } }
          );
          const data = await res.json();
          const val: LocationValue = {
            display: data.display_name,
            lat: latitude,
            lng: longitude,
          };
          setQuery(data.display_name);
          onChange(val);
          toast.success("Location detected!");
        } catch {
          toast.error("Could not resolve your location.");
        } finally {
          setIsDetecting(false);
        }
      },
      () => {
        toast.error("Location access denied. Please allow it and try again.");
        setIsDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  // Format display name shorter for dropdown items
  function shortName(display: string) {
    const parts = display.split(", ");
    return parts.slice(0, 4).join(", ");
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Input row */}
      <div className="relative flex items-center">
        <MapPin className="absolute left-3 w-4 h-4 text-primary/50 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={handleInput}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
          placeholder={placeholder}
          className="w-full bg-black/20 border border-white/10 focus:border-primary/50 focus:outline-none text-white font-light text-sm pl-10 pr-12 h-12 placeholder:text-white/25 transition-colors"
        />
        {/* Right: spinner or detect */}
        <div className="absolute right-3 flex items-center">
          {isSearching ? (
            <Loader2 className="w-4 h-4 text-primary/50 animate-spin" />
          ) : (
            <button
              type="button"
              title="Detect my location"
              onClick={handleDetectLocation}
              disabled={isDetecting}
              className="text-primary/40 hover:text-primary transition-colors"
            >
              {isDetecting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Navigation className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Coordinates badge */}
      {value && value.lat && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.2em] text-primary/60 font-medium">
            {value.lat.toFixed(6)}° N, {value.lng.toFixed(6)}° E
          </span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span className="text-[9px] text-on-surface-variant/50 truncate max-w-[180px]">
            {value.display.split(",")[0]}
          </span>
        </motion.div>
      )}

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 top-full left-0 right-0 mt-1 bg-[#111] border border-white/10 shadow-2xl max-h-72 overflow-y-auto"
          >
            {results.map((r, i) => (
              <motion.li
                key={r.place_id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <button
                  type="button"
                  onClick={() => handleSelect(r)}
                  className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0 group"
                >
                  <MapPin className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary mt-0.5 shrink-0 transition-colors" />
                  <div className="min-w-0">
                    <p className="text-white text-xs font-light leading-tight truncate">
                      {shortName(r.display_name)}
                    </p>
                    <p className="text-[9px] text-on-surface-variant/50 mt-0.5">
                      {parseFloat(r.lat).toFixed(5)}° N &nbsp;
                      {parseFloat(r.lon).toFixed(5)}° E
                    </p>
                  </div>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
