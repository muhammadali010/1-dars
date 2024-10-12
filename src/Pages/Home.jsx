import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        <div className='container mx-auto p-5'>
            <h1 className='text-3xl ml-96 font-bold mb-4'>Food Blog</h1>
             <p className='text-gray-700 ml-60 mb-6'>   Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur. </p> 
            <div className="wrapper flex justify-center gap-3 flex-wrap" style={{ width: '1280px', height: '610px', margin: '0 auto' }}>
                {data.map(value => (
                    <img className='w-64 h-64  rounded-lg shadow-lg' key={value.id} src={value.thumbnailUrl} alt="rasm" />
                ))}
            </div>
            <div className="flex justify-center mt-6">
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
