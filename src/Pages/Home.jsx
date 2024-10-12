import React, { useState, useEffect } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotalPages] = useState(625);
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(8);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [currentPage]);

    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-4xl font-extrabold text-center mb-4'>Food Blog</h1>
            <p className='text-lg text-center text-gray-600 mb-6'>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {data.map(value => (
                    <div key={value.id} className='bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow'>
                        <img className='w-full h-48 object-cover rounded-md' src={value.url} alt="rasm" />
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-10">
                <ResponsivePagination
                    current={currentPage}
                    total={total}
                    onPageChange={setCurrentPage}
                    maxWidth={400}
                    className="pagination"
                />
            </div>
        </div>
    );
}

export default Home;
