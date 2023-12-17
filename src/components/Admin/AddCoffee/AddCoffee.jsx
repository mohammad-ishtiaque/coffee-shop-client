import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import Header from '../../Shared/Header/Header';

const AddCoffee = () => {
    const handleAddCoffee = (e) => {
        e.preventDefault()
        const form = e.target;
        const coffeeName = form.name.value
        const chefName = form.chefName.value
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photoUrl = form.photoUrl.value;

        const addedCoffee = { coffeeName, chefName, supplier, taste, category, details, photoUrl }
        console.log(addedCoffee)
        fetch('https://server-delta-hazel.vercel.app/coffee', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addedCoffee)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: 'success!',
                        text: 'Do you want to continue',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }
    return (
        <div >
            <button className='text-2xl family-rancho md:pl-38 pl-20 mt-5'><Link to="/"> <i className="fa-solid fa-arrow-left text-xl"></i> Back To Home</Link></button>
            <div className='flex flex-col justify-center items-center bg-[#F4F3F0] w-3/4 mx-auto mt-5 pt-10 pb-10'>
                <h1 className='text-[#374151] text-4xl font-normal family-rancho'>Add a Coffee</h1>
                <p className='family-raleway text-[18px] w-3/4 mb-4 mt-4'><small>It is a long established fact that a reader will be distraceted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</small></p>



                <form action="" onSubmit={handleAddCoffee} className='family-raleway mx-8' >

                    <div className='flex flex-col md:flex-row md:gap-8'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Enter Coffee Name" name='name' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Chef</span>
                            </label>
                            <input type="text" placeholder="Enter Chef Name" name='chefName' className="input input-bordered" required />
                        </div>
                    </div>


                    <div className='flex flex-col md:flex-row  md:gap-8'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Supplier</span>
                            </label>
                            <input type="text" placeholder="Enter coffee supplier" name='supplier' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Taste</span>
                            </label>
                            <input type="text" placeholder="Enter coffee taste" name='taste' className="input input-bordered" required />
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row  md:gap-8'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <input type="text" placeholder="Enter coffee category" name='category' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Details</span>
                            </label>
                            <input type="text" placeholder="Enter coffee details" name='details' className="input input-bordered" required />
                        </div>
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input type="text" placeholder="Enter Photo URL" name='photoUrl' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <br />
                        <input type="submit" value='Add Coffee' className="input input-bordered family-rancho bg-[#D2B48C]" required />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCoffee;