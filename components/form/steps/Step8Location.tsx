import { useState } from 'react';
import Slider from '@/components/ui/Slider';
import { MatchRequestFormData } from '@/types/form';

interface Step8Props {
    formData: MatchRequestFormData;
    updateFormData: (updates: Partial<MatchRequestFormData>) => void;
}

export default function Step8Location({ formData, updateFormData }: Step8Props) {
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    const handleRadiusChange = (value: number[]) => {
        updateFormData({ search_radius: value[0] });
    };

    const handleUseLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setIsLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    updateFormData({ location_coords: { lat, lon } });

                    // Reverse geocoding
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
                        {
                            headers: {
                                'User-Agent': 'Carbi-Website/1.0 (car matching service)'
                            }
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();
                        let locationText = '';
                        if (data.address) {
                            locationText = data.address.postcode ||
                                data.address.city ||
                                data.address.town ||
                                data.address.village ||
                                '';
                        }

                        // Fallback
                        if (!locationText) locationText = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;

                        updateFormData({ postcode: locationText });
                    } else {
                        updateFormData({ postcode: `${lat.toFixed(4)}, ${lon.toFixed(4)}` });
                    }
                } catch (error) {
                    console.error('Location processing error:', error);
                    // Non-fatal, just stop loading
                } finally {
                    setIsLoadingLocation(false);
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                alert('Enable location in your browser or type it in manually.');
                setIsLoadingLocation(false);
            }
        );
    };

    const formatRadius = (val: number) => `${val} miles`;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Where are you based?</h2>
            <p className="text-lg text-slate-500 mb-8">Enter your location and how far you'd travel to collect a car.</p>

            <button
                type="button"
                onClick={handleUseLocation}
                disabled={isLoadingLocation}
                className="w-full py-2 mb-6 flex items-center justify-center gap-2 border-2 border-[#0EA5E9] text-[#0EA5E9] bg-white rounded-xl font-bold hover:bg-sky-50 transition-colors"
            >
                {isLoadingLocation ? '⏳ Getting location...' : '📍 Use my current location'}
            </button>

            <div className="space-y-6">
                <input
                    type="text"
                    value={formData.postcode}
                    onChange={(e) => updateFormData({ postcode: e.target.value })}
                    placeholder="e.g. SW1A 1AA or London"
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-xl font-medium text-slate-800 focus:border-primary focus:outline-none transition-all placeholder:text-slate-400 hover:border-slate-300"
                />

                <div className="bg-sky-50 p-3 rounded-xl text-center font-medium text-slate-800">
                    Up to {formData.search_radius} miles from {formData.postcode || 'your location'}
                </div>

                <div className="px-2">
                    <Slider
                        min={10}
                        max={400}
                        step={5}
                        value={[formData.search_radius]}
                        onValueChange={handleRadiusChange}
                        formatLabel={formatRadius}
                    />
                </div>
            </div>
        </div>
    );
}
