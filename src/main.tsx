import ReactDOM from 'react-dom/client'
import HomePage from './page/HomePage.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./page/ErrorPage.tsx";
import DragAndDropPage from "./page/DragAndDropPage.tsx";
import {AGREGATION_URL, DRAG_AND_DROP_URL, HOME_URL, SEARCH_URL} from "./constante.ts";
import SearchPage from "./page/SearchPage.tsx";
import AgregationPage from "./page/AgregationPage.tsx";

const router = createBrowserRouter([
    {
        path: HOME_URL,
        element: <HomePage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: DRAG_AND_DROP_URL,
        element: <DragAndDropPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: SEARCH_URL,
        element: <SearchPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: AGREGATION_URL,
        element: <AgregationPage/>,
        errorElement: <ErrorPage/>
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)