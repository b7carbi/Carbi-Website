interface OptionButtonProps {
    label: string;
    selected: boolean;
    onClick: () => void;
    icon?: React.ReactNode;
}

export default function OptionButton({ label, selected, onClick, icon }: OptionButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className={`
        relative flex items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 min-h-[50px] w-full text-center font-medium
        ${selected
                    ? 'bg-sky-50 border-primary text-slate-700'
                    : 'bg-white border-slate-300 text-slate-600 hover:border-primary'
                }
      `}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {label}
        </button>
    );
}
