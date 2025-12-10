import * as SliderPrimitive from '@radix-ui/react-slider';

interface SliderProps {
    value: number[];
    min: number;
    max: number;
    step?: number;
    onValueChange: (value: number[]) => void;
    formatLabel?: (value: number) => string;
}

export default function Slider({ value, min, max, step = 1, onValueChange, formatLabel }: SliderProps) {
    return (
        <SliderPrimitive.Root
            className="relative flex items-center select-none touch-none w-full h-10"
            value={value}
            max={max}
            min={min}
            step={step}
            onValueChange={onValueChange}
        >
            <SliderPrimitive.Track className="bg-slate-200 relative grow rounded-full h-[6px]">
                <SliderPrimitive.Range className="absolute bg-primary rounded-full h-full" />
            </SliderPrimitive.Track>
            {value.map((val, i) => (
                <SliderPrimitive.Thumb
                    key={i}
                    className="block w-6 h-6 bg-primary border-2 border-primary shadow-[0_2px_10px_rgba(14,165,233,0.3)] rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-transform"
                    aria-label={formatLabel ? formatLabel(val) : 'Volume'}
                />
            ))}
        </SliderPrimitive.Root>
    );
}
