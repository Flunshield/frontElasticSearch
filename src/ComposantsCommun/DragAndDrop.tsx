import React, {useState} from 'react';
import {API_URL, ELASTICSEARCH_INDEX_URL} from "../constante.ts";

const DragAndDrop: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [indexName, setIndexName] = useState('');
    const [file, setFile] = useState<File>();

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
        const files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type === 'text/csv' || file.type === 'application/json') {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('indexName', indexName); // Ajouter le nom de l'index
                setFile(file);
            } else {
                console.log('Unsupported file type.');
            }
        }
    };

    const handleUpload = async () => {
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('indexName', indexName);
        try {
            const response = await fetch(`${API_URL}${ELASTICSEARCH_INDEX_URL}`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log('File uploaded successfully.');
            } else {
                console.error('Failed to upload file.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        setFile(undefined);
    }

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
                            <button onClick={handleUpload}
                                    className="border-2 bg-petroleum-blue text-tertiari p-1 rounded-lg mt-10">Upload
                            </button>
                            <button onClick={handleDelete}
                                    className="border-2 bg-red text-tertiari p-1 rounded-lg mt-10 ml-1">Supprimer
                            </button>
                        </div>
                    )
                    :
                    <div>
                        <p className="text-lg font-medium mb-2">Drag & Drop CSV or JSON files here</p>
                        <p className="text-gray-500">Supported file types: .csv, .json</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default DragAndDrop;
