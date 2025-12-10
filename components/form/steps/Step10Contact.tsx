import { MatchRequestFormData, ContactPreference } from '@/types/form';

interface Step10Props {
    formData: MatchRequestFormData;
    updateFormData: (updates: Partial<MatchRequestFormData>) => void;
}

export default function Step10Contact({ formData, updateFormData }: Step10Props) {
    const preferences: ContactPreference[] = ['Email', 'Text', 'Phone Call'];

    const togglePreference = (pref: ContactPreference) => {
        const current = formData.contact_preferences;
        const updated = current.includes(pref)
            ? current.filter(p => p !== pref)
            : [...current, pref];
        updateFormData({ contact_preferences: updated });
    };

    const showEmail = formData.contact_preferences.includes('Email');
    const showPhone = formData.contact_preferences.includes('Text') || formData.contact_preferences.includes('Phone Call');

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">How can we reach you?</h2>
            <p className="text-lg text-slate-500 mb-8">We'll be in touch within 24 hours.</p>

            {/* Contact Preferences */}
            <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-4">How would you like to be contacted? <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {preferences.map(method => {
                        const isSelected = formData.contact_preferences.includes(method);
                        return (
                            <button
                                key={method}
                                type="button"
                                onClick={() => togglePreference(method)}
                                className={`
                                    flex flex-col items-center justify-center py-4 px-2 rounded-xl border-2 transition-all duration-200
                                    ${isSelected
                                        ? 'bg-sky-50 border-primary shadow-sm text-primary'
                                        : 'bg-white border-slate-200 hover:border-primary text-slate-600'
                                    }
                                `}
                            >
                                <span className={`font-semibold ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                                    {method}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-500 mb-2">
                        First name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => updateFormData({ first_name: e.target.value })}
                        placeholder="First name"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-medium text-slate-700 focus:border-primary focus:outline-none transition-colors"
                        autoComplete="given-name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-500 mb-2">
                        Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => updateFormData({ last_name: e.target.value })}
                        placeholder="Last name"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-medium text-slate-700 focus:border-primary focus:outline-none transition-colors"
                        autoComplete="family-name"
                    />
                </div>
            </div>

            {/* Conditional Email */}
            {showEmail && (
                <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-sm font-semibold text-slate-500 mb-2">
                        Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-medium text-slate-700 focus:border-primary focus:outline-none transition-colors"
                        autoComplete="email"
                    />
                </div>
            )}

            {/* Conditional Phone */}
            {showPhone && (
                <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-sm font-semibold text-slate-500 mb-2">
                        Phone number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        value={formData.phone || ''}
                        onChange={(e) => updateFormData({ phone: e.target.value })}
                        placeholder="07x xxxxxxxx"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-medium text-slate-700 focus:border-primary focus:outline-none transition-colors"
                        autoComplete="tel"
                    />
                </div>
            )}
        </div>
    );
}
