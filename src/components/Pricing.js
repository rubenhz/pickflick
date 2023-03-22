import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../context"

export default function Pricing(props) {

    const {user, db } = useContext(Context)

    const navigate = useNavigate()

    const planPrices = {
        tier_1: 'price_1McvqiGcTEAi0gGzPscwwekx',
        tier_2: 'price_1McvqpGcTEAi0gGzpjsRof8P',
        tier_3: 'price_1McvqvGcTEAi0gGzzGdLGWPg'
    }

    async function buySubscription(event) {
        const tier = event.target.name
        const docRef = await addDoc(collection(db, `customers/${user.uid}/checkout_sessions`), {
            price: planPrices[tier],
            success_url: 'https://pickflick-1.web.app/',
            cancel_url: 'https://pickflick-1.web.app/'
        })
        console.log('something happened...')
        onSnapshot(docRef, doc => {
            console.log('something updated')
            const {error, url } = doc.data()
            if (url) {
                console.log(url)
                window.location.assign(url)
            } else {
                console.log(error.message)
            }
        })
    }

    function handleClick(event) {
        user ? buySubscription(event) : navigate('/login/sign-up')
    }

    return <div className="p-4 mb-10">
        <div className='flex flex-col items-center mt-16 mb-14'>
            <h2 className='text-2xl font-medium text-slate-900 border-b-blue-700 border-b-2 pb-4 mb-4'>Pricing</h2>
            <p className="text-slate-700 font-semibold text-md text-center">{props.subtitle}</p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:justify-center">
            <div className="border border-slate-300 flex flex-col items-center p-4 md:w-96">
                <p className="text-lg">Curie</p>
                <p className="my-2 font-semibold">$4.99/mo.</p>
                <p className="text-center font-light">
                    Get movie recommendations powered by Curie, a standard AI model that gets the job done.
                </p>
                <button 
                    className="bg-blue-700 p-2 w-36 rounded mt-5 text-slate-50"
                    name='tier_1'
                    onClick={handleClick}
                    >
                    Select Plan
                </button>
            </div>
            <div className="border border-slate-300 flex flex-col items-center p-4 md:w-96">
                <p className="text-lg">DaVinci</p>
                <p className="my-2 font-semibold">$9.99/mo.</p>
                <p className="text-center font-light">
                    Get movie recommendations powered by DaVinci, a powerful AI model that understands elaborate questions and delivers high-quality recommendations.
                </p>
                <button 
                    className="bg-blue-700 p-2 w-36 rounded mt-5 text-slate-50"
                    name='tier_2'
                    onClick={handleClick}
                    >
                    Select Plan
                </button>
            </div>
            <div className="border border-slate-300 flex flex-col items-center p-4 md:w-96">
                <p className="text-lg">Miranda</p>
                <p className="my-2 font-semibold">$19.99/mo.</p>
                <p className="text-center font-light">
                    Get movie recommendations powered by Miranda, an extremely powerful and cutting-edge AI model that will understand the most complex of questions and deliver the best movie recommendations.
                </p>
                <button 
                    className="bg-blue-700 opacity-50 p-2 w-36 rounded mt-5 text-slate-50"
                    name='tier_3'
                    onClick={handleClick}
                    disabled
                    >
                    Coming Soon
                </button>
            </div>
        </div>
    </div>
}