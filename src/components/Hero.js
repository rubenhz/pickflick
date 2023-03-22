import { Link } from "react-router-dom"

export default function Hero() {
    return <div className='bg-blue-700 h-[380px] flex flex-col justify-center items-center px-4'>
        <p className='text-2xl w-72 text-slate-50 md:mt-24 md:w-full text-center'>Find new movies with the help of AI</p>
        <Link to='/login/sign-in' className='border-2 border-slate-50 py-3 px-6 mt-8 mb-24 md:mb-52 rounded w-72 text-center text-slate-50 text-lg' href='#'>
            Get Started
        </Link>
    </div>
}