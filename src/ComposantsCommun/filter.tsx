import React, { useState } from 'react';
import { searchByFilter } from "../helper.ts";
import {Index} from "../page/SearchPage.tsx";

interface FilterProps {
    columns: string[];
    setIndexData: (data: never) => void;
    closeFilter?: () => void;
    setTotalPage: (totalPage: number) => void;
    currentPage: number;
    itemsPerPage: number;
    indexSelected: Index | undefined;
}

const Filter = ({ columns, setIndexData, closeFilter, indexSelected, itemsPerPage, currentPage, setTotalPage }: FilterProps) => {
    const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});

    const handleInputChange = (column: string, value: string) => {
        setFilterValues(prevValues => ({ ...prevValues, [column]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = {
            indexName: indexSelected?.index ?? "",
            currentPage: currentPage,
            itemsPerPage: itemsPerPage,
            query: filterValues,
        };
        const result = await searchByFilter(data);
        setIndexData(result as unknown as never);
        setTotalPage(Math.ceil((result?.hits?.total.value ?? 0) / itemsPerPage));
        if (closeFilter) closeFilter();
    };

    return (
        <form className="flex flex-wrap justify-center gap-4 mt-6" onSubmit={handleSubmit}>
            {columns.map(column => (
                <input
                    key={column}
                    className="px-4 py-2 rounded-md border border-gray-300"
                    type="text"
                    value={filterValues[column] || ""}
                    onChange={(e) => handleInputChange(column, e.target.value)}
                    placeholder={column.charAt(0).toUpperCase() + column.slice(1)}
                />
            ))}
            <button type="submit" className="px-4 py-2 rounded-md bg-blue-500 text-white">
                Filtrer
            </button>
        </form>
    );
};

export default Filter;
