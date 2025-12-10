import { useEffect, useRef } from 'react';

const GranularSlider = ({ value, onChange }) => {
    const sliderRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault();
            onChange(Math.min(3, value + 1));
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault();
            onChange(Math.max(0, value - 1));
        }
    };

    const getLabel = (val) => {
        switch (val) {
            case 0: return 'None';
            case 1: return 'Basic';
            case 2: return 'Standard';
            case 3: return 'Full';
            default: return '';
        }
    };

    const getColor = (val) => {
        switch (val) {
            case 0: return 'bg-gray-600';
            case 1: return 'bg-red-500';
            case 2: return 'bg-yellow-500';
            case 3: return 'bg-green-500';
            default: return 'bg-gray-600';
        }
    };

    return (
        <div className="w-full py-4">
            <div
                className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
                onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    const newValue = Math.round(percent * 3);
                    onChange(newValue);
                }}
            >
                {/* Track fill */}
                <div
                    className={`absolute h-full rounded-full transition-all duration-300 ${getColor(value)}`}
                    style={{ width: `${(value / 3) * 100}%` }}
                />

                {/* Thumb */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-gray-300 shadow-sm transform transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ left: `${(value / 3) * 100}%`, transform: 'translate(-50%, -50%)' }}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    role="slider"
                    aria-valuemin={0}
                    aria-valuemax={3}
                    aria-valuenow={value}
                    aria-label="Consent Level"
                />

                {/* Ticks */}
                {[0, 1, 2, 3].map((tick) => (
                    <div
                        key={tick}
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"
                        style={{ left: `${(tick / 3) * 100}%`, transform: 'translate(-50%, -50%)' }}
                    />
                ))}
            </div>

            {/* Labels */}
            <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
                {[0, 1, 2, 3].map((tick) => (
                    <span
                        key={tick}
                        className={`cursor-pointer transition-colors ${value === tick ? 'text-gray-900 font-bold' : ''}`}
                        onClick={() => onChange(tick)}
                    >
                        {getLabel(tick)}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default GranularSlider;
