import { Route, Routes, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'

export default function Login() {

    

    const location = useLocation()
    const formPaths = {signIn: 'sign-in', signUp: 'sign-up'}

    function showCTA() {
        if (location.pathname.includes(formPaths.signIn)) {
            return <CTA
                title='Find your next movie gem'
                subtitle='Sign In below to get started'
            />
        } else {
            return <CTA
                title='Find your next favorite flick'
                subtitle='Create an account below and choose a plan'
            />
        }
    }

    return <div className='h-screen flex flex-col'>
        <Header />
        <div className="flex-1 flex flex-col md:w-[500px] md:mx-auto">
            {showCTA()}
            <div className="border mx-4 p-4 shadow-md mb-16 self-stretch">
                <Routes>
                    <Route path={formPaths.signIn} element={<SignIn />} />
                    <Route path={formPaths.signUp} element={<SignUp />} />
                </Routes>
            </div>
        </div>
    </div>
}

function CTA({title, subtitle}) {
    return <div className='self-stretch mx-4 my-12'>
        <h1 className='text-xl text-center text-slate-900'>{title}</h1>
        <p className='text-center text-slate-700'>{subtitle}</p>
    </div>
}