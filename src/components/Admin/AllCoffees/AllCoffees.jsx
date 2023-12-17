import React, { useContext, useState } from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import mug from '../../../assets/images/icons/mug.png'
import CoffeeCard from './CoffeeCard';
import Header from '../../Shared/Header/Header';
import { AuthContext } from '../../../Provider/AuthProvider';
const AllCoffees = () => {
    const {user} = useContext(AuthContext)
    const loadedCoffee = useLoaderData()
    const [coffees, setCoffees] = useState(loadedCoffee)

    return (
        <>
            <Header />
            <div className='bg-coffee'>
                <div className='m-20'>
                    <div className='flex flex-col justify-center items-center '>
                        <p className='text-xl family-raleway mt-2 mb-3'>--- Sip & Savor ---</p>
                        <h4 className='family-rancho text-[#331A15] text-4xl font-normal mb-3'>Our Popular Products</h4>
                        <button className='border-[#331A15] border-2 rounded bg-[#E3B577] text-[#331A15] family-rancho text-2xl px-5 py-2 mb-4 '><Link to="/addCoffee" className='flex justify-center items-center gap-3'>Add Coffee <img src={mug} alt="" /></Link></button>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        {
                            coffees?.map(coffee =>
                                <CoffeeCard key={coffee._id} coffee={coffee} coffees={coffees} setCoffees={setCoffees} />
                            )
                        }
                    </div>
                </div>
            </div>
        </>

    );
};

export default AllCoffees;