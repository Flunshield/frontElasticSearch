import {API_URL, ELASTICSEARCH_GET_INDEX_URL, ELASTICSEARCH_SEARCH_URL, GET_ALL_INDEX_URL} from "./constante.ts";

export async function getAllIndexes() {
    const response = await fetch(API_URL + GET_ALL_INDEX_URL, {
        method: 'GET',
    });
    return response.json();
}

export async function getIndex(indexSelected: string, currentPage: number, itemsPerPage: number) {
    const response = await fetch(`${API_URL + ELASTICSEARCH_GET_INDEX_URL}?index=${indexSelected}&page=${currentPage}&elementsPerPage=${itemsPerPage}`, {
        method: 'GET',
    });
    return response.json();
}

export async function searchByFilter(data: { indexName: string, currentPage: number, itemsPerPage: number, query: { title: string, type: string, author: string, sortie: string, categorie: string, realisateur: string, casting: string }}) {
    const response = await fetch(`${API_URL + ELASTICSEARCH_SEARCH_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            data
        }),
    });
    return response.json();
}


export const nextPage = (currentPage: number, setCurrentPage: (currentPage: number) => void) => {
    setCurrentPage(currentPage + 1);
};

export const prevPage = (currentPage: number, setCurrentPage: (currentPage: number) => void) => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
};