import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase"

export default function SignUp() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)

    function onSubmit(event) {
        event.preventDefault()
        createUserWithEmailAndPassword(auth, form.email, form.password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: form.name
                })
                    .then(() => {
                        navigate('/plans')
                    })
                    .catch(err => console.log(err.message))
            })
            .catch(err => {
                setError(error)
                setForm({name: '', email: '', password: ''})
                console.log(err.code)
            })
    }

    function handleChange(event) {
        setForm(prev => {
            return {...prev, [event.target.name]:event.target.value }
        })
    }

    return <form 
        className="flex flex-col relative" 
        onSubmit={onSubmit}
        >
        <input
            className='mb-4 p-2 rounded-sm border border-slate-200'
            type='text'
            placeholder='Name'
            name='name'
            onChange={handleChange}
            value={form.name}
            required
        />
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
            Sign Up
        </button>
        <Link 
            className='bg-white rounded-lg shadow-md p-1 w-56 mx-auto text-xs text-slate-400 text-center absolute -bottom-14 right-0 left-0'
            to='../sign-in'
            >
            Already have an account? <span className='underline'>Sign In</span>
        </Link>
    </form>
}