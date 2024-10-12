import React, { useEffect, useState, useRef } from 'react';

const App = () => {
    const [imgs, setImgs] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10;
    const loaderRef = useRef(null);

    const fetchImgs = () => {
        fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                setImgs(prevPhotos => [...prevPhotos, ...data]);
            })
            .catch(error => {
                console.error("Rasmlarni yuklashda xato:", error);
            });
    };

    useEffect(() => {
        fetchImgs();
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-extrabold text-center mb-8">Gallery</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {imgs.map(img => (
                    <div className="border shadow-lg h-auto border-gray-300 rounded-lg overflow-hidden transition-transform transform hover:scale-105" key={img.id}>
                        <img className="w-full h-48 object-cover" src={img.thumbnailUrl} alt={img.title} />
                        <div className="p-4">
                            <p className="text-sm text-gray-600">{img.title}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div ref={loaderRef} className="mt-8 h-10 w-full flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        </div>
    );
};

export default App;
