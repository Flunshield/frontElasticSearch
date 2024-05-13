import ReactDOM from 'react-dom/client'
import App from './page/App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./ErrorPage.tsx";
import Draganddroppage from "./page/Draganddroppage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/draanddrop",
        element: <Draganddroppage/>,
        errorElement: <ErrorPage/>
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)