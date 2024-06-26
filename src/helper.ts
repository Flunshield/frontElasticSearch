import {
    API_URL,
    ELASTICSEARCH_GET_INDEX_URL,
    ELASTICSEARCH_GETT_ALL_COLUMN_URL,
    ELASTICSEARCH_SEARCH_URL,
    GET_ALL_INDEX_URL
} from "./constante.ts";

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

export async function searchByFilter(data: { indexName: string, currentPage: number, itemsPerPage: number, query: { [key: string]: string }}) {
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

export async function getAllColumns(indexSelected: string) {
    const response = await fetch(`${API_URL + ELASTICSEARCH_GETT_ALL_COLUMN_URL}?indexName=${indexSelected}`, {
        method: 'GET',
    });
    return response.json();
}
