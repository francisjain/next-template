"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import '../style.css'
import { useState } from "react";

export default function AuthLayout({ children, }: {
    children: React.ReactDOM
}) {

    const pathName = usePathname();

    const navItem = [
        { name: "Login", path: '/login' },
        { name: "Register", path: '/register' },
        { name: "Foget Password", path: '/forgot-password' },
    ]

    const [first, setfirst] = useState<string>("");
    return (
        <>
            <h2 style={{ color: "red" }}>Inner Layout</h2>
            <input type="text" name="" id="" value={first} onChange={e => setfirst(e.target.value)} />
            <div>
                {
                    navItem.map(
                        (item) => {
                            const isActive = pathName.startsWith(item.path)
                            return <Link href={item.path} className={isActive ? 'text-red-400' : 'text-green-950'} > {item.name}</Link>
                        }
                    )
                }
            </div>
            {children}
        </>
    );
}