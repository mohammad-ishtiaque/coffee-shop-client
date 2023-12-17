import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import delete1 from '../../assets/images/icons/delete.png'

const User = () => {
    const loadedUser = useLoaderData()
    const [users, setUsers] = useState(loadedUser)
    const [count , setCount ] = useState(users.length);

    const handleDeleteUser = (id) => {
        console.log(id)
        fetch(`https://server-delta-hazel.vercel.app/user/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const remianingUsers = users.filter(user => user._id !== id)
            setUsers(remianingUsers)
            console.log(remianingUsers)
        })
    }
    
    

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* <!-- head --> */}
                <thead>
                    <tr>
                        {/* <th></th> */}
                        <th>Name</th>
                        <th>Email</th>
                        <th>Created At</th>
                        <th>Last Logged At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <!-- row 1 --> */}
                    {
                        users.map(user => <tr key={user._id}>
                            {/* <th>{}</th> */}
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.createdAt}</td>
                            <td>{user?.lastLoggedAt}</td>
                            <td><button className="btn bg-[#EA4744]" onClick={() => handleDeleteUser(user._id)} ><img src={delete1} alt="" /></button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default User;