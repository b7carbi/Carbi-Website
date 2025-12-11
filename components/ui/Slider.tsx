import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import './slider.css'; // Keeping this in case we want to add specific overrides, but mostly relying on Tailwind

interface SliderProps {
    value: number[];
    min: number;
    max: number;
    step?: number;
    onValueChange: (value: number[]) => void;
    formatLabel?: (value: number) => string;
    'data-testid'?: string;
}

export default function Slider({ value, min, max, step = 1, onValueChange, formatLabel, 'data-testid': testId }: SliderProps) {
    // Optimization: Keep a local state for the slider to ensure smooth dragging
    const [localValue, setLocalValue] = React.useState(value);

    // Refs for state management without re-renders
    const isDraggingRef = React.useRef(false);
    const lastUpdateRef = React.useRef(0);
    const THROTTLE_MS = 100; // Limit updates to ~10fps to save main thread

    // Sync local state when props change externally, BUT ONLY if we are not currently dragging.
    React.useEffect(() => {
        if (!isDraggingRef.current) {
            setLocalValue(value);
        }
    }, [value]);

    // Handle updates during drag - Throttled
    const handleChange = (newValue: number[]) => {
        setLocalValue(newValue);
        isDraggingRef.current = true;

        const now = Date.now();
        if (now - lastUpdateRef.current >= THROTTLE_MS) {
            onValueChange(newValue);
            lastUpdateRef.current = now;
        }
    };

    // Handle drag end - Force sync
    const handleCommit = (newValue: number[]) => {
        isDraggingRef.current = false;
        // Always send the final value immediately
        onValueChange(newValue);
        lastUpdateRef.current = Date.now();
    };

    return (
        <SliderPrimitive.Root
            className="relative flex w-full touch-none select-none items-center py-4"
            value={localValue}
            max={max}
            min={min}
            step={step}
            onValueChange={handleChange}
            onValueCommit={handleCommit}
            data-testid={testId}
        >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-200">
                <SliderPrimitive.Range className="absolute h-full bg-[#0EA5E9]" />
            </SliderPrimitive.Track>
            {localValue.map((_, i) => (
                <SliderPrimitive.Thumb
                    key={i}
                    className="block h-6 w-6 rounded-full bg-[#0EA5E9] shadow-sm hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    aria-label={formatLabel ? formatLabel(localValue[i]) : "Slider Value"}
                    data-testid={testId ? `${testId}-thumb-${i}` : undefined}
                />
            ))}
        </SliderPrimitive.Root>
    );
}
