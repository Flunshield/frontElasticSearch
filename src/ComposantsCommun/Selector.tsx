import React, { useState } from 'react';

interface Option {
    value: string | number;
    label: string | number;
}

interface SelectorProps {
    options: Option[];
    onChange: (selectedValue: string | number) => void;
}

const Selector: React.FC<SelectorProps> = ({ options, onChange }) => {
    const [selectedValue, setSelectedValue] = useState<string | number | undefined>(undefined);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedValue(selectedValue);
        onChange(selectedValue);
    };

    return (
        <select value={selectedValue} onChange={handleChange} className="pl-5 rounded-lg mr-10 bg-gray-300 text-secondary font-bold">
            <option value="">Sélection un index</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Selector;
