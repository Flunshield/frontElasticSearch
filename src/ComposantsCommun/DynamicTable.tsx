import React from 'react';

interface TableRowData {
    [key: string]: never;
}

interface Props {
    data: TableRowData[];
    columns: string[]
}

const DynamicTable: React.FC<Props> = ({data, columns}) => {
    if (data.length === 0) {
        return <div className="text-center text-gray-500">No data available</div>;
    }

    return (
        <table className="w-full border-collapse text-justify text-gray-500">
            <thead>
            <tr>
                {columns.map((column, index) => (
                    <th
                        key={index}
                        className="px-4 py-2 font-semibold border border-gray-300 text-center uppercase"
                    >
                        {column}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                    {columns.map((column, key) => (
                        <td key={key} className="px-4 py-2 border border-gray-300">
                            {item._source[column]}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DynamicTable;