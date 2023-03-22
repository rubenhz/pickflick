import { useContext, useState } from "react";
import Header from "../components/Header";
import { Context } from "../context";
import {getFunctions, httpsCallable } from 'firebase/functions'

export default function Account() {

    const { subscription, user } = useContext(Context)

    const [loading, setLoading] = useState(false)

    /**
     * TODO
     * - Manage Stripe Account
     * - Change Display Name
     * - Change Password
     * - Sign Out
     */

    async function customerPortal() {
        setLoading(true)
        const functions = getFunctions()
        const createPortalLink = httpsCallable(functions, 'ext-firestore-stripe-payments-createPortalLink')
        const { data } = await createPortalLink({
            returnUrl: window.location.origin,
            locale: 'auto'
        })
        window.location.assign(data.url)
    }


    const { signOutUser } = useContext(Context)

    return <div>
        <Header />
        <div className="md:w-[1240px] md:mx-auto md:flex text-slate-700">
            <div className="flex flex-col m-4 md:border md:border-slate-200 md:rounded md:p-8 md:my-4">
                <p className="mb-9">Your current plan is <span className='capitalize font-bold'>{subscription}</span></p>
                <p>See or change your current subscription.</p>
                <button className="flex gap-2 self-start border border-green-500 p-2 mt-2 text-green-700 rounded mb-9 hover:bg-green-500 hover:text-green-50" onClick={customerPortal}>{loading && <SimpleLoader className='inline-block' />} Customer Portal</button>
                <p className="mb-2">Signed In as <span className="font-bold">{user.displayName}</span></p>
                <button className="self-start text-red-500 p-2 border border-red-300 rounded hover:bg-red-500 hover:text-red-50" onClick={signOutUser}>Sign Out</button>
            </div>
        </div>
    </div>
}

function SimpleLoader({className}) {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 animate-spin ${className}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
}