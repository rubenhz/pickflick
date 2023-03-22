import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { Context } from "../context"

export default function Header() {

    const shrink = 'h-0' // Tailwind CSS height: 0px
    const grow = 'h-40' // Tailwind CSS height: 160px
    const [expand, setExpand] = useState(shrink)

    function toggleExpand() {
        setExpand(prev => {
            if (prev === shrink) {
                return grow
            } else {
                return shrink
            }
        })
    }

    return <div className="bg-blue-700">
        <div className="flex justify-between px-5 py-6 border-b border-b-blue-400 md:max-w-[1240px] md:px-5 md:mx-auto text-blue-100">
            <Link to='/'>PickFlick</Link>
            <div>
                <svg
                    className="w-6 h-6 h md:hidden"
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    onClick={toggleExpand}
                    >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
                    />
                </svg>
                <NavGroup className='hidden md:flex gap-4' />
            </div>
        </div>
        <div 
            className={`
                transition-[height] 
                ${expand}
                bg-blue-50
                z-10 
                w-full 
                absolute 
                overflow-hidden 
                text-slate-500
            `}
            >
            <NavGroup className='mx-4 my-2 flex flex-col gap-2' />
        </div>
    </div>
}

function NavGroup({className}) {
    const { user } = useContext(Context)

    return <ul className={`${className}`}>
        <li><Link to='/'>Home</Link></li>
        {
            user ? 
            <li>Signed in as <span className="font-semibold">{user.displayName}</span></li>
             : <li><Link to='login/sign-in'>Sign In</Link></li>
        }
        {
            user &&
            <>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <li><Link to='/account'>Account</Link></li>
            </>
        }
    </ul>
}