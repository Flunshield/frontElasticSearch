import Layout from "../ComposantsCommun/Layout.tsx";
import {useEffect, useState} from "react";
import Selector from "../ComposantsCommun/Selector.tsx";
import DynamicTable from "../ComposantsCommun/DynamicTable.tsx";
import clsx from "clsx";
import Filter from "../ComposantsCommun/filter.tsx";
import {getAllIndexes, getIndex, searchByFilter} from "../helper.ts";
import {ITEMS_PER_PAGE} from "../constante.ts";

interface Index {
    index: string;
    id: string;
}

interface dataReceived {
    hits: {
        total: {
            value: number;
        };
        hits: [];
    };
}

function SearchPage() {
    const [index, setIndex] = useState<Index[]>();
    const [indexSelected, setIndexSelected] = useState<Index>();
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [indexData, setIndexData] = useState<dataReceived>();
    const [totalPage, setTotalPage] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [sortie, setSortie] = useState<string>("");
    const [categorie, setCategorie] = useState<string>("");
    const [realisateur, setRealisateur] = useState<string>("");
    const [casting, setCasting] = useState<string>("");
    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    const [filterApplied, setFilterApplied] = useState<boolean>(false);

    const openFilter = () => {
        setFilterOpen(true);
    }

    const closeFilter = () => {
        const data = {
            indexName: indexSelected?.index ?? "",
            currentPage: currentPage,
            itemsPerPage: itemsPerPage,
            query: {
                title: title ?? "",
                type: type ?? "",
                author: author ?? "",
                sortie: sortie ?? "",
                categorie: categorie ?? "",
                realisateur: realisateur ?? "",
                casting: casting ?? ""
            }
        };
        searchByFilter(data).then((data) => {
            setIndexData(data);
            setTotalPage(Math.ceil((data?.hits?.total.value ?? 0) / itemsPerPage));
        });
        setFilterApplied(true);
        setFilterOpen(false);
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
    };

    function renderPageNumbers() {
        const pageNumbers = [];
        const totalPages = totalPage;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === currentPage - 1 ||
                i === currentPage ||
                i === currentPage + 1 ||
                i === totalPages
            ) {
                pageNumbers.push(
                    <button
                        key={i}
                        className={clsx(
                            "px-4 py-2 rounded-md text-white ml-2",
                            i === currentPage ? "bg-gray-600" : "bg-petroleum-blue"
                        )}
                        onClick={() => setCurrentPage(i)}
                    >
                        {i}
                    </button>
                );
            } else if (
                i === currentPage - 2 ||
                i === currentPage + 2
            ) {
                pageNumbers.push(
                    <span key={i} className="mx-2">
                        ...
                    </span>
                );
            }
        }

        return pageNumbers;
    }

    useEffect(() => {
        if (!filterApplied && indexSelected) {
            getIndex(indexSelected.index, currentPage, itemsPerPage).then((data) => {
                setIndexData(data);
                setTotalPage(Math.ceil((data?.hits?.total.value ?? 0) / itemsPerPage));
            });
            if (currentPage > totalPage) {
                setCurrentPage(1);
            }
        } else {
            getAllIndexes().then((data) => {
                setIndex(data);
            });
        }
    }, [indexSelected, itemsPerPage, currentPage, totalPage]);

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

                    <button
                        className="px-4 py-2 rounded-md bg-petroleum-blue text-white ml-2"
                        onClick={openFilter}
                    >
                        Filtrer
                    </button>
                </div>

                {filterOpen && (
                    <Filter
                        title={title}
                        setTitle={setTitle}
                        setType={setType}
                        type={type}
                        setAuthor={setAuthor}
                        author={author}
                        setSortie={setSortie}
                        sortie={sortie}
                        setCategorie={setCategorie}
                        categorie={categorie}
                        setRealisateur={setRealisateur}
                        realisateur={realisateur}
                        setCasting={setCasting}
                        casting={casting}
                        closeFilter={closeFilter}
                    />)
                }
                <div className="m-5">
                    {indexData && indexData?.hits?.total.value > 0 && (
                        <DynamicTable data={indexData?.hits?.hits}/>
                    )}
                    <div className="flex justify-center mt-5">
                        {currentPage > 1 && (
                            <button
                                className="px-4 py-2 rounded-md bg-petroleum-blue text-white mr-2"
                                onClick={prevPage}
                            >
                                Précédent
                            </button>
                        )}
                        {renderPageNumbers()}
                        {currentPage < totalPage && (
                            <button
                                className="px-4 py-2 rounded-md bg-petroleum-blue text-white ml-2"
                                onClick={nextPage}
                            >
                                Suivant
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SearchPage;
