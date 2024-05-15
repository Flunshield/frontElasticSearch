import Layout from "../ComposantsCommun/Layout.tsx";
import { useEffect, useState } from "react";
import { API_URL, ELASTICSEARCH_AGREGATION_URL } from "../constante.ts";
import { getAllIndexes, getAllColumns } from "../helper.ts"; // Assurez-vous d'importer getAllColumns ici
import { Index } from "./SearchPage.tsx";
import Selector from "../ComposantsCommun/Selector.tsx";

interface AggregationResult {
    key: string;
    count: number;
}

function AgregationPage() {
    const [aggregationResult, setAggregationResult] = useState<AggregationResult[]>([]);
    const [selectedAggregation, setSelectedAggregation] = useState<string>('');
    const [index, setIndex] = useState<Index[]>();
    const [indexSelected, setIndexSelected] = useState<Index>();
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        getAllIndexes().then((data) => {
            setIndex(data);
        });
    }, []);

    useEffect(() => {
        if (indexSelected) {
            getAllColumns(indexSelected.index).then((data) => {
                console.log(data[indexSelected.index].mappings.properties)
                const key = Object.keys(data[indexSelected.index].mappings.properties);
                setColumns(key);
            });
        }
    }, [indexSelected]);
    useEffect(() => {
        if (selectedAggregation && indexSelected) {
            fetchAggregation(selectedAggregation);
        }
    }, [selectedAggregation, indexSelected]);

    const fetchAggregation = async (aggregationType: string) => {
        try {
            const response = await fetch(`${API_URL + ELASTICSEARCH_AGREGATION_URL}?type=${aggregationType}&index=${indexSelected?.index}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setAggregationResult(data);
        } catch (error) {
            console.error('Error fetching aggregation:', error);
        }
    };

    const handleAggregationSelect = (aggregationType: string) => {
        setSelectedAggregation(aggregationType);
    };

    return (
        <Layout>
            <div className="max-w-lg mx-auto mt-10">
                <h1 className="text-center text-3xl font-bold mb-8">Page d'agrégation</h1>
                <p className="m-5">Veuillez sélectionner un index : </p>
                <Selector
                    options={index?.map((index) => ({ value: index.id, label: index.index })) || []}
                    onChange={(selectedValue) => {
                        setIndexSelected(index?.find((index) => index.id === selectedValue))
                    }}
                />
                <div className="flex justify-center mb-8 space-x-4">
                    {columns.map((column) => (
                        <button
                            key={column}
                            className={`bg-gray-200 text-gray-700 border-2 border-primary px-6 py-3 rounded-lg focus:outline-none 
              ${selectedAggregation === column && 'bg-petroleum-blue text-white'}`}
                            onClick={() => handleAggregationSelect(column)}
                        >
                            {column}
                        </button>
                    ))}
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border-primary border-2">
                        <thead>
                        <tr className="bg-gray-200 border-primary border-2">
                            <th className="px-6 py-4 text-left text-lg font-bold border-primary border-2">Clé</th>
                            <th className="px-6 py-4 text-left text-lg font-bold">Nombre</th>
                        </tr>
                        </thead>
                        <tbody>
                        {aggregationResult.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="px-6 py-4 border-primary border-2">{item.key}</td>
                                <td className="px-6 py-4 border-primary border-2">{item.count}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default AgregationPage;
