import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

export default function SignIn() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)

    function onSubmit(event) {
        event.preventDefault()
        signInWithEmailAndPassword(auth, form.email, form.password)
            .then(userCredential => {
                setError(null)
                navigate('/dashboard')
            })
            .catch(err => {
                setError(err.code)
                setForm(prev => {
                    return {email: '', password: ''}
                })
            })
    }

    function handleChange(event) {
        setForm(prev => {
            return {...prev, [event.target.name]: event.target.value}
        })
    }

    return <form 
        className="flex flex-col relative" 
        onSubmit={onSubmit}
        >
        <input
            className='mb-4 p-2 rounded-sm border border-slate-200'
            type='email'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            value={form.email}
            required
        />
        <input
            className='p-2 rounded-sm border border-slate-200' 
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleChange}
            value={form.password}
            required
        />
        <button 
            className='mt-8 bg-blue-800 w-32 mx-auto py-2 rounded-sm text-slate-100'
            >
            Sign In
        </button>
        {error && <p className="text-red-400 text-center p-1 border border-red-100 mt-4 text-xs">{error}</p>}
        <Link 
            className='bg-white rounded-lg shadow-md p-1 w-56 mx-auto text-xs text-slate-400 text-center absolute -bottom-14 right-0 left-0'
            to='../sign-up'
            >
            Don't have an account? <span className='underline'>Sign Up</span>
        </Link>
    </form>
}