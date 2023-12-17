import React from 'react';
import delete1 from '../../../assets/images/icons/delete.png'
import edit from '../../../assets/images/icons/edit.png'
import Swal from 'sweetalert2'
import view from '../../../assets/images/icons/view.png'
import { Link } from 'react-router-dom';

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
    const { _id, coffeeName, chefName, supplier, photoUrl, taste, category, details } = coffee;
    // console.log(coffee)
    const handleDeleteCoffee = (_id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://server-delta-hazel.vercel.app/coffee/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Coffee has been deleted.",
                                icon: "success"
                            });
                            const remaining = coffees.filter(cof => cof._id !== _id)
                            setCoffees(remaining)
                        }

                    })

            }
        });
    }
    return (
        <div className="card md:card-side family-raleway shadow-xl bg-[#F5F4F1] py-8">
            <figure><img src={photoUrl} alt="Movie" /></figure>
            <div className="flex flex-col md:flex-row w-full justify-between">
                <div className='ml-4  flex flex-col justify-center space-y-2'>
                    <h2 className="card-title">Name: {coffeeName}</h2>
                    <h2 className="card-title">Chef: {chefName}</h2>
                    <h2 className="card-title">Supplier: {supplier}</h2>
                </div>
                <div className="card-actions justify-evenly mt-3 md:mt-0 md:justify-end">
                    <div className="join md:join-vertical flex flex-row  md:flex-col  md:justify-center space-x-4 md:space-x-0 md:pr-10  md:space-y-3">
                        <button className="btn  bg-[#D2B48C]"><img src={view} alt="" /></button>
                        <Link to={`updateCoffee/${_id}`}><button className="btn bg-[#3C393B]"><img src={edit} alt="" /></button></Link>
                        <button className="btn bg-[#EA4744]" onClick={() => handleDeleteCoffee(_id)}><img src={delete1} alt="" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;