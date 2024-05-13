import Layout from "../ComposantsCommun/Layout.tsx";
import DragAndDrop from "../ComposantsCommun/DragAndDrop.tsx";

function Draganddroppage() {

    return (
        <Layout>
            <div className="flex flex-col m-10 justify-center text-justify">
                <h1 className="font-bold text-2xl">Glisser et Déposer des Fichiers</h1>
                <p className="mt-5">Utilisez la fonctionnalité de glisser et déposer ci-dessous pour ajouter facilement des fichiers à votre application. Vous pouvez simplement prendre un fichier depuis votre ordinateur et le déposer dans la zone spécifiée ci-dessous.</p>

                <p className="mt-5 mb-5">Cette fonctionnalité prend en charge les fichiers aux formats .csv (valeurs séparées par des virgules) et .json (format de texte simple pour les données structurées). Une fois que vous avez ajouté un fichier, il sera traité automatiquement.</p>
            <DragAndDrop/>
            </div>
        </Layout>
    )
}

export default Draganddroppage
