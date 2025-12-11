import Image from 'next/image';
import { MatchRequestFormData } from '@/types/form';

interface Step4Props {
    formData: MatchRequestFormData;
    updateFormData: (updates: Partial<MatchRequestFormData>) => void;
}

export default function Step4Brands({ formData, updateFormData }: Step4Props) {
    const brands = {
        'Premium': ['Audi', 'BMW', 'Mercedes', 'MINI', 'Volvo'],
        'Established': ['Ford', 'Honda', 'Mazda', 'SEAT', 'Skoda', 'Smart', 'Toyota', 'Volkswagen'],
        'Regular': ['Citroen', 'Dacia', 'DS', 'Fiat', 'Hyundai', 'Kia', 'MG', 'Mitsubishi', 'Nissan', 'Peugeot', 'Renault', 'Suzuki', 'Vauxhall']
    };

    const toggleBrand = (brand: string) => {
        const current = formData.selected_brands;
        let updated: string[];

        if (current.includes(brand)) {
            updated = current.filter(b => b !== brand);
        } else {
            updated = [...current, brand];
        }

        // If brands are selected, we are in 'specific' mode
        updateFormData({
            selected_brands: updated,
            brand_preference: updated.length > 0 ? 'specific' : 'dont_mind'
        });
    };

    const handleDontMind = () => {
        updateFormData({
            brand_preference: 'dont_mind',
            selected_brands: [] // Clear selection
        });
    };

    // Helper to get image path (assuming they exist, mapped from name)
    const getLogoPath = (brand: string) => {
        // Map special cases if needed, otherwise default to lower case
        const map: { [key: string]: string } = {
            'Mercedes': 'mercedes-logo.png',
            'Volkswagen': 'vw-logo.png',
            'BMW': 'BMW-logo.png', // Case sensitive on some systems?
            'MINI': 'MINI-logo.png',
            // ... add others if filenames don't match pattern
        };

        const filename = map[brand] || `${brand.toLowerCase()}-logo.png`;
        return `/images/brands/${filename}`;
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Any brand preferences?</h2>
            <p className="text-lg text-slate-500 mb-8">Choose brands you like or skip if you don't mind.</p>

            <button
                type="button"
                onClick={handleDontMind}
                className={`
                    w-full p-4 rounded-xl border-2 text-lg transition-all mb-8
                    ${formData.brand_preference === 'dont_mind' && formData.selected_brands.length === 0
                        ? 'bg-sky-50 border-primary text-slate-700 font-medium'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                    }
                `}
            >
                Don't mind - find the best car regardless of brand
            </button>

            <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-slate-200 flex-1" />
                <span className="text-slate-400 font-medium">Or choose specific brands</span>
                <div className="h-px bg-slate-200 flex-1" />
            </div>

            <div className="space-y-8">
                {Object.entries(brands).map(([category, brandList]) => (
                    <div key={category}>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pl-1">{category}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {brandList.map(brand => {
                                const isSelected = formData.selected_brands.includes(brand);
                                return (
                                    <button
                                        key={brand}
                                        type="button"
                                        onClick={() => toggleBrand(brand)}
                                        className={`
                                            relative flex flex-row items-center p-4 rounded-xl border transition-all duration-200
                                            ${isSelected
                                                ? 'bg-sky-50 border-primary shadow-sm'
                                                : 'bg-white border-slate-200 hover:border-primary'
                                            }
                                        `}
                                    >
                                        <div className="w-8 h-8 relative shrink-0 mr-3">
                                            <img
                                                src={getLogoPath(brand)}
                                                alt={brand}
                                                className="w-full h-full object-contain"
                                                loading="lazy"
                                            />
                                        </div>
                                        <span className={`text-base flex-1 text-center pr-6 ${isSelected ? 'text-slate-800' : 'text-slate-600'}`}>
                                            {brand}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
