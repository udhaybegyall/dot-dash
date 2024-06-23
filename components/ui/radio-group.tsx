import { useState } from 'react';
import { cn } from '@/lib/utils';

interface RadioGroupProps {
    options: string[];
    onChange?: (value: string) => void;
}

const RadioGroup = ({ options, onChange }: RadioGroupProps) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleChange = (option: string) => {
        setSelectedOption(option);
        onChange?.(option);
    };

    return (
        <div className='flex space-x-4'>
            {options.map(option => (
                <button
                    key={option}
                    className={cn(
                        'flex h-12 w-12 items-center justify-center rounded border border-gray-300',
                        selectedOption === option
                            ? 'bg-blue-500 font-bold text-white'
                            : 'bg-white text-black'
                    )}
                    onClick={() => handleChange(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default RadioGroup;
