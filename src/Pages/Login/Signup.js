import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../../features/auth/authSlice';

const Signup = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const dispatch =useDispatch()
    let signInError;
    const onSubmit = async data=> {
       
            // const res = await fetch(
            //     'https://power-hack-server-abjy.onrender.com/api/registration',
            //     {
            //         method: 'PUT',
            //         headers: {
            //             'content-type': 'application/json',
            //         },
            //         body: JSON.stringify(data)
            //     }
            // );
            // const result = await res.json(); 
        dispatch(createUser(data))
            
    };
    return (
        <div className='flex h-screen justify-center items-center '>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-secondary text-2xl font-bold">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Name is required'
                                }
                            })} type="text" placeholder="name" className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message}</span>}

                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is required'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid Email'
                                }
                            })} type="email" placeholder="email" className="input input-bordered w-full max-w-xs" />
                            {/* <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}

                            </label> */}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Password must be 6 character'
                                }
                            })} type="password" placeholder="password" className="input input-bordered w-full max-w-xs" />
                            {/* <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}
                            </label> */}
                        </div>
                        {signInError}
                        <input type="submit" className='btn btn-accent w-full max-w-xs' value='Sign Up' />
                    </form>
                    <p><small>Already in Power-Hack ? <Link to='/login' className='text-secondary'>Please login</Link></small></p>
                    
                </div>
            </div>
        </div>
    );
};

export default Signup;