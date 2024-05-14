import Layout from "../ComposantsCommun/Layout.tsx";
import {useEffect, useState} from "react";
import Selector from "../ComposantsCommun/Selector.tsx";
import {API_URL, ELASTICSEARCH_GET_INDEX_URL, GET_ALL_INDEX_URL} from "../constante.ts";
import DynamicTable from "../ComposantsCommun/DynamicTable.tsx";
import clsx from "clsx";

interface Index {
    index: string;
    id: string;
}

function SearchPage() {
    const [index, setIndex] = useState<Index[]>();
    const [indexSelected, setIndexSelected] = useState<Index>();
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [indexData, setIndexData] = useState();

    const ITEMS_PER_PAGE = [
        {value: 10, label: 10},
        {value: 50, label: 50},
        {value: 100, label: 100},
        {value: 500, label: 500},
    ]
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
    };

    async function getAllIndexes() {
        const response = await fetch(API_URL + GET_ALL_INDEX_URL, {
            method: 'GET',
        });
        return response.json();
    }

    async function getIndex(indexSelected: string) {
        const response = await fetch(`${API_URL + ELASTICSEARCH_GET_INDEX_URL}?index=${indexSelected}&page=${currentPage}&elementsPerPage=${itemsPerPage}`, {
            method: 'GET',
        });
        return response.json();
    }

    useEffect(() => {
        getAllIndexes().then((data) => {
            setIndex(data);
        });
    }, []);

    useEffect(() => {
        if (indexSelected) {
            getIndex(indexSelected.index).then((data) => {
                setIndexData(data);
            });
        }
    }, [indexSelected, itemsPerPage, currentPage]);
    return (
        <Layout>
            <div>
                <h1 className="text-center text-2xl font-bold mt-10 mb-10">Application</h1>
                <div className="flex flex-row">
                    <p className="m-5">Veuillez sélectionner un index : </p>
                    <Selector options={index?.map((index) => ({value: index.id, label: index.index})) || []}
                              onChange={(selectedValue) => {
                                  setIndexSelected(index?.find((index) => index.id === selectedValue))
                              }}/>
                    <p className="m-5">
                        Item par page :
                    </p>
                    <Selector options={ITEMS_PER_PAGE?.map((index) => ({value: index.value, label: index.label}))}
                              onChange={(selectedValue) => {
                                  setItemsPerPage(selectedValue as number)
                              }}/>
                </div>
                <div className="m-5">
                    {indexData && indexData?.hits?.total.value > 0 && (
                    <DynamicTable data={indexData?.hits?.hits}/>)}
                    <div className={clsx(currentPage > 1 ? "justify-between" : "justify-end", "m-5 flex w-full")}>
                        {currentPage > 1 && (
                        <button
                            className="px-4 py-2 rounded bg-petroleum-blue text-white"
                            onClick={prevPage}
                        >
                            Précédent
                        </button>)}
                        <button
                            className="px-4 py-2 rounded bg-petroleum-blue text-white mr-10"
                            onClick={nextPage}
                        >
                            Suivant
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SearchPage;