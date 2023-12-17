import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, GoogleAuthProvider } from "firebase/auth"
import app from "./firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa"
// import { AuthContext } from "../Providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';


const Register = () => {
    const { createUser, signWithGoogle } = useContext(AuthContext)
    const auth = getAuth(app)
    const [registerError, setRegisterError] = useState('');
    const [registerSuccuss, setRegisterSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const nevigate = useNavigate()

    const location = useLocation();

    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        signWithGoogle(provider)
            .then((user) => {
                nevigate(location?.state ? location.state : '/')
            })
            .catch((error) => {
                console.log(error)
            })

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        if (!accepted) {
            setRegisterError('Please accept the terms & conditions')
            return;
        }

        if (!password.length > 6) {
            setRegisterError("Your password must be greater than 6 letter.")
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError("Your Password must contain at least one uppercase letter.")
        } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
            setRegisterError("Your Password must contain at least one special character.")
        } else {
            createUser(email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    const createdAt = user.metadata.creationTime
                    const userTobackend = { name, email, createdAt }
                    fetch(`https://server-delta-hazel.vercel.app/user`, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(userTobackend)

                    })
                    .then(res => res.json())
                    .then(data => {
                            console.log(data)
                            if(data.insertedId){
                                Swal.fire({
                                    title: "Created!",
                                    text: "User has been created.",
                                    icon: "success"
                                });
                            }
                        })

                    console.log(userTobackend)
                    //reset the error message.
                    setRegisterError('');
                    setRegisterSuccess('Registration Successfull')
                    //update profile 
                    updateProfile(user, {
                        displayName: name,
                        photoURL: 'https://i.ibb.co/fvqkNYJ/you.webp'
                    })

                        .then(() => {
                            alert('Updated')
                        })
                        .catch((error) => {
                            console.log(error);
                        })

                    nevigate(location?.state ? location.state : '/')


                    //email verifivation 
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            alert('please!  verify your email now.')
                        });
                })
                .catch((error) => {
                    setRegisterSuccess('');
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setRegisterError(errorMessage);
                });
        }

    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse w-[400px]">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 ">
                    <h3 className="text-center text-xl font-bold mt-5">Sign Up</h3>
                    <div className="text-center mt-4">
                        <p className="text-red-700">{registerError}</p>
                        <p className="text-green-700">{registerSuccuss}</p>
                    </div>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="name"
                                name="name"
                                placeholder="Enter Your Name"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Your Email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="input input-bordered w-full"
                                    required
                                />
                                <span
                                    className="absolute top-4 right-2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <input type="checkbox" name="terms" id="" />
                            <label className="ml-2" htmlFor="terms">
                                accept the terms and condition.
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary  bg-[#f05f79] hover:bg-[#f09aaa] text-white border-none">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div className="form-control card-body pt-0 mt-0">
                        <button
                            onClick={handleGoogleSignIn}
                            className="btn btn-primary bg-[#f05f79] hover:bg-[#f09aaa] text-white border-none"
                        >
                            <FaGoogle /> Sign In With Google
                        </button>
                        <p className="text-center mt-5">
                            Already have an account?{" "}
                            <Link className="text-[#f05f79]" to="/login">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;