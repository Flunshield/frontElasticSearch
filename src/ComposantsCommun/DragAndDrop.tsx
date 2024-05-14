import React, { useState } from 'react';
import { API_URL, ELASTICSEARCH_INDEX_URL } from '../constante.ts';

const DragAndDrop: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [indexName, setIndexName] = useState('');
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState(false); // Nouvelle variable d'état pour le chargement

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        setIsLoading(true); // Activation du loader pendant le drag and drop
        const files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.size > 3 * 1024 * 1024) { // Vérification de la taille du fichier (3 Mo)
                window.alert('Le fichier est trop volumineux. Veuillez sélectionner un fichier de moins de 3 Mo.');
                continue; // Ignorer le fichier et passer au suivant
            }
            if (file.type === 'text/csv') {
                const reader = new FileReader();
                reader.onload = () => {
                    const lines = reader.result?.toString()?.split('\n');
                    const headers = lines?.shift()?.split(',');
                    const jsonArray = lines?.map(line => {
                        const values = line.split(',');
                        return headers?.reduce((obj, header, index) => {
                            obj[header.trim()] = values[index];
                            return obj;
                        }, {} as Record<string, string>);
                    });
                    const jsonContent = JSON.stringify(jsonArray);
                    const blob = new Blob([jsonContent], { type: 'application/json' });
                    const jsonFile = new File([blob], file.name.replace('.csv', '.json'), { type: 'application/json' });

                    setFile(jsonFile);
                };
                reader.readAsText(file);
                reader.readAsText(file);
            } else if (file.type === 'application/json') {
                setFile(file);
            } else {
                console.log('Unsupported file type.');
            }
        }
        setIsLoading(false); // Désactivation du loader une fois le traitement du fichier terminé
    };

    const handleUpload = async () => {
        if (!file) {
            return;
        }
        setIsLoading(true); // Activation du loader pendant le téléchargement
        const formData = new FormData();
        formData.append('file', file);
        formData.append('indexName', indexName);
        try {
            const response = await fetch(`${API_URL}${ELASTICSEARCH_INDEX_URL}`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                window.alert("Fichier indexé");
                setFile(undefined);
                setIndexName('');
            } else {
                window.alert(await response.json().then((data) => data.message));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false); // Désactivation du loader une fois le téléchargement terminé
        }
    };

    const handleDelete = async () => {
        setFile(undefined);
    };
    return (
        <div>
            <input
                type="text"
                placeholder="Enter index name"
                value={indexName}
                onChange={(e) => setIndexName(e.target.value)}
                className="border border-gray-400 p-2 mb-4"
            />
            <div
                className={`border-2 border-dashed border-gray-400 p-4 ${
                    isDragging ? 'bg-gray-200' : ''
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {file ? (
                    <div className="font-bold">
                        <p>Nom du fichier : {file.name}</p>
                        <p>Type de fichier : {file.type}</p>
                        <p>Taille du fichier : {file.size} bytes</p>
                        <button onClick={handleUpload} className="border-2 bg-petroleum-blue text-tertiari p-1 rounded-lg mt-10">
                            Upload
                        </button>
                        <button onClick={handleDelete} className="border-2 bg-red text-tertiari p-1 rounded-lg mt-10 ml-1">
                            Supprimer
                        </button>
                        {isLoading && <div className="text-olive-green mt-5 text-2xl">Loading...</div>} {/* Affichage du loader */}
                    </div>
                ) : (
                    <div>
                        <p className="text-lg font-medium mb-2">Drag & Drop CSV or JSON files here</p>
                        <p className="text-gray-500">Supported file types: .csv, .json</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DragAndDrop;
