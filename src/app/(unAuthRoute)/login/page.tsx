"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import logo from '@/assets/images/vercel.svg';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { authenticateUser } from '@/services/loginServices';
import { loginPageSlices } from './loginPageSlice';
import { useRouter } from 'next/navigation';
import { ROUTE_DASHBOARD } from '@/config/routeConfig';



const LoginPage = () => {
    const navigate = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector(loginPageSlices);

    const [userName, setuserName] = useState<string>("");
    const [password, setpassword] = useState<string>("");

    useEffect(() => {
        if (isAuthenticated) {
                navigate.push(ROUTE_DASHBOARD);
        }
    }, [isAuthenticated]);

    //handling login form submit
    const handleSave = (e: any) => {
        e.preventDefault();
        dispatch(authenticateUser({ username: userName, password: password }));
    }




    return (
        <>
            <header className=" bg-[var(--color-F5F5F5)]">
                <nav className="flex items-center justify-center w-100 py-[37px] px-[37px] lg:px-[62px] ">
                    <div className="flex items-center justify-between w-full max-w-[1436px] ">
                        <div className="flex items-center gap-3">
                            <Image
                                className="h-5 w-auto"
                                src={logo}
                                alt="Logo"
                                loading="lazy"
                                decoding="async"
                                height={57}
                                width={57}
                            />
                            <h1 className="text-[var(--color-253179)] text-xl font-bold tracking-[0.05px] ">Bark Back</h1>
                        </div>

                    </div>
                </nav>
            </header>
            <div className='flex flex-col justify-between bg-[var(--color-F5F5F5)] w-full min-h-[calc(100vh-132px)] '>
                <div className=' bg-[var(--color-F5F5F5)] flex justify-center items-center px-6 py-[42px] lg:px-8'>
                    <div className=" bg-[var(--color-white)] flex min-h-full max-w-[488px] rounded-xl flex-1 flex-col justify-center p-9 gap-12">


                        <div className="">
                            <form className="" onSubmit={(e) => handleSave(e)}>
                                <div>
                                    <label htmlFor="" className='flex flex-col gap-3'>
                                        <span className='text-[15px] text-[var(--color-212121)] tracking-[0.05px] '>Username <span className='text-[var(--color-9E9E9E)]'>(Email)</span></span>
                                        <input
                                        className=''
                                            required={true}
                                            placeholder='Email'
                                            autoComplete="email"
                                            type='email'
                                            value={userName}
                                            onChange={(e) => setuserName(e.target.value)}
                                        />
                                    </label>
                                </div>


                                <div className='flex flex-col gap-4 mt-9'>

                                    <label htmlFor="" className='flex flex-col gap-3'><span className='text-[15px] text-[var(--color-212121)] tracking-[0.05px] '>Password</span>
                                        <input
                                            required={true}
                                            placeholder='Password'
                                            type='password'
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                        />
                                    </label>


                                </div>

                                <div>
                                    <button type="submit" className='w-full py-4 font-medium text-xl rounded-[30px] mt-8 ' >Submit</button>
                                </div>
                                <p className="text-[var(--color-757575)] text-center mt-4 text-[15px] tracking-[0.05px]">Don’t have an account? <a href={"/"} className='text-[var(--color-0048D4)] underline tracking-[0.05px]'>Register</a> instead
                                </p>
                            </form>

                        </div>
                    </div>
                </div>




            </div>
        </>
    )
}

export default LoginPage;