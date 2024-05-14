import Layout from "../ComposantsCommun/Layout.tsx";

function HomePage() {

    return (
        <Layout>
            <div className="flex flex-col m-10 justify-center text-justify">
                <h1 className="font-bold text-2xl">Principe de communication entre le front-end, l'API NestJS et
                    Elasticsearch</h1>

                <p className="mt-10">Notre architecture repose sur une communication fluide entre le front-end, notre
                    API NestJS et Elasticsearch, permettant une expérience utilisateur riche et réactive tout en
                    garantissant une gestion efficace des données.</p>

                <p className="mt-5"><span className="font-bold">Front-end React TSX : </span>Notre interface utilisateur
                    est développée en utilisant React TSX, offrant une approche déclarative et modulaire pour la
                    construction d'interfaces utilisateur interactives. Le front-end réagit aux interactions de
                    l'utilisateur et envoie des requêtes à notre API NestJS pour récupérer, manipuler et afficher les
                    données provenant d'Elasticsearch.</p>

                <p className="mt-5"><span className="font-bold">API NestJS : </span>Notre API est construite avec
                    NestJS, un framework Node.js basé sur Express, offrant une architecture modulaire et évolutive pour
                    la création d'API robustes. Notre API agit comme une passerelle entre le front-end et Elasticsearch,
                    gérant les requêtes HTTP entrantes, traitant les données et les transmettant à Elasticsearch pour
                    récupération ou modification.
                </p>

                <p className="mt-5"><span className="font-bold">Elasticsearch : </span>Notre moteur de recherche
                    Elasticsearch est utilisé comme base de données et moteur de recherche, offrant des capacités de
                    recherche avancées et des performances élevées pour stocker et interroger des données structurées.
                    Elasticsearch est utilisé pour stocker et indexer les données pertinentes pour notre application, ce
                    qui permet des recherches rapides et efficaces en réponse aux requêtes du front-end via notre API
                    NestJS.
                </p>

                <p className="mt-5">Lorsqu'un utilisateur interagit avec notre application front-end, des requêtes sont
                    envoyées à notre API NestJS, qui les transmet ensuite à Elasticsearch pour traitement. Les résultats
                    sont renvoyés à l'API, qui les formate et les renvoie au front-end pour affichage à l'utilisateur.
                    Cette approche permet une séparation claire des responsabilités entre les différentes parties de
                    notre architecture, favorisant la scalabilité, la maintenabilité et la performance de notre
                    application.</p>
            </div>
        </Layout>
    )
}

export default HomePage
