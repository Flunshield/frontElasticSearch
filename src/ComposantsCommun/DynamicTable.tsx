import React from 'react';

interface TableRowData {
    [key: string]: never;
}

interface Props {
    data: TableRowData[];
}

const COLUMN_DEFINITIONS = [
    { key: 'title', title: 'Title' },
    { key: 'type', title: 'Type' },
    { key: 'description', title: 'Description' },
    { key: 'date_added', title: 'Sortie' },
    { key: 'duration', title: 'Durée' },
    { key: 'listed_in', title: 'Catégorie' },
    { key: 'director', title: 'Réalisateur' },
    { key: 'cast', title: 'Casting' },
];

const DynamicTable: React.FC<Props> = ({ data }) => {
    if (data.length === 0) {
        return <div className="text-center text-gray-500">No data available</div>;
    }

    return (
        <table className="w-full border-collapse text-left text-gray-500">
            <thead>
            <tr>
                {COLUMN_DEFINITIONS.map((column, index) => (
                    <th
                        key={index}
                        className="px-4 py-2 font-semibold border border-gray-300"
                    >
                        {column.title}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                    {COLUMN_DEFINITIONS.map((column) => (
                        <td key={column.key} className="px-4 py-2 border border-gray-300">
                            {item._source[column.key]}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DynamicTable;