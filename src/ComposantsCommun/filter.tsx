
interface FilterProps {
    setTitle: (title: string) => void;
    title: string;
    setType: (type: string) => void;
    type: string;
    setAuthor: (author: string) => void;
    author: string;
    setSortie: (sortie: string) => void;
    sortie: string;
    setCategorie: (categorie: string) => void;
    categorie: string;
    setRealisateur: (realisateur: string) => void;
    realisateur: string;
    setCasting: (casting: string) => void;
    casting: string;
    closeFilter?: () => void;
}

const Filter = ({
                    title,
                    type,
                    author,
                    sortie,
                    categorie,
                    realisateur,
                    casting,
                    setTitle,
                    setType,
                    setAuthor,
                    setSortie,
                    setCategorie,
                    setRealisateur,
                    setCasting,
                    closeFilter
                }: FilterProps) => {

    return (
        <form className="flex flex-wrap justify-center gap-4 mt-6">
            <input
                className="px-4 py-2 rounded-md border border-gray-300"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                className="px-4 py-2 rounded-md border border-gray-300"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Type"
            />
            <input
                className="px-4 py-2 rounded-md border border-gray-300"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
            />
            <input
                className="px-4 py-2 rounded-md border border-gray-300"
                type="text"
                value={sortie}
                onChange={(e) => setSortie(e.target.value)}
                placeholder="Sortie"
            />
            <input
                className="px-4 py-2 rounded-md border border-gray-300"
                type="text"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                placeholder="Catégorie"
            />
            <input
                className="px-4 py-2 rounded-md border border-gray-300"
                type="text"
                value={realisateur}
                onChange={(e) => setRealisateur(e.target.value)}
                placeholder="Réalisateur"
            />
            <input
                className="px-4 py-2 rounded-md border border-gray-300"
                type="text"
                value={casting}
                onChange={(e) => setCasting(e.target.value)}
                placeholder="Casting"
            />
            <button type="submit" onClick={closeFilter}>Filtrer</button>
        </form>
    );
};

export default Filter;
