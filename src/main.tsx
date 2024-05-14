import ReactDOM from 'react-dom/client'
import HomePage from './page/HomePage.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./page/ErrorPage.tsx";
import DragAndDropPage from "./page/DragAndDropPage.tsx";
import {DRAG_AND_DROP_URL, HOME_URL} from "./constante.ts";

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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)