import React, { useState } from 'react';

const DragAndDrop: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [indexName, setIndexName] = useState('');

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
                try {
                    const response = await fetch('http://localhost:3000/elasticsearch/index', {
                        method: 'POST',
                        body: formData,
                    });
                    if (response.ok) {
                        console.log('File uploaded successfully.');
                        // Handle success response
                    } else {
                        console.error('Failed to upload file.');
                        // Handle error response
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                    // Handle network error
                }
            } else {
                console.log('Unsupported file type.');
            }
        }
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
                <p className="text-lg font-medium mb-2">Drag & Drop CSV or JSON files here</p>
                <p className="text-gray-500">Supported file types: .csv, .json</p>
            </div>
        </div>
    );
};

export default DragAndDrop;
