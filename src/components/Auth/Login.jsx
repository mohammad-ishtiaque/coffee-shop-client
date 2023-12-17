import React from 'react';
import app from './firebase.config';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from '../../Provider/AuthProvider';

const Login = () => {

    const [loginSuccuss, setLoginSuccess] = useState('');
    const [loginError, setLoginError] = useState('');
    const emailRef = useRef(null);
    const nevigate = useNavigate()

    const location = useLocation();

    const { signInUser, signWithGoogle } = useContext(AuthContext)
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        signWithGoogle(provider)
            .then((user) => {
                alert('Logged in successfully')
                nevigate(location?.state ? location.state : '/')
            })
            .catch((error) => {
                const errorMessage = error.message
                setLoginError(errorMessage)
                setLoginSuccess('')
            })

    }

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then((userCredential) => {
                const userInfo = userCredential.user;
                console.log(userInfo)
                setLoginError('');
                nevigate(location?.state ? location.state : '/')
                alert("logged in successfully.")
                e.target.reset();
                const lastLoggedAt = userInfo?.metadata?.lastSignInTime
                const userToUpdate = {
                    email, lastLoggedAt
                }
                fetch(`https://server-delta-hazel.vercel.app/user`, {
                    method: 'PATCH',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(userToUpdate)

                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoginError("please check your email or password.")
                alert('please check your email or password')
                setLoginSuccess('')
            });
    }

    const handleResetPassword = e => {
        const email = emailRef.current.value;
        console.log(email)
        if (!email) {
            console.log('please provide the valid email')
            return
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            console.log("please check your email id missing anything?")
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("please check your email inbox!")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
            });



    }
    const auth = getAuth(app)
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className=" flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h3 className="text-center text-xl font-bold mt-5">Sign In</h3>
                    <div className="text-center mt-4">
                        <p className="text-red-700">{loginError}</p>
                        <p className="text-green-700">{loginSuccuss}</p>
                    </div>
                    <form onSubmit={handleLogin} className="card-body overlay">

                        <div className="form-control">

                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                name="email"
                                ref={emailRef}
                                type="email"
                                placeholder="Enter Your Email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                className="input input-bordered"
                                required
                            />
                            <label className="label">
                                <a
                                    href="#"
                                    className="label-text-alt link link-hover"
                                    onClick={() => handleResetPassword()}
                                >
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">

                            <button className="btn btn-primary bg-[#f05f79] hover:bg-[#f09aaa] text-white border-none">
                                Sign In
                            </button>
                            {/* <ToastContainer /> */}
                        </div>
                    </form>

                    <div className="form-control card-body pt-0">

                        <button
                            onClick={handleGoogleSignIn}
                            className="btn btn-primary bg-[#f05f79] hover:bg-[#f09aaa] text-white border-none"
                        >
                            <FaGoogle /> Sign In With Google
                        </button>
                        {/* <ToastContainer /> */}
                        <p className="text-center pb-5">
                            Doesn't have an account yet?{" "}
                            <Link className="text-[#f05f79]" to="/register">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;