import { useContext, useEffect, useState } from "react"
import { Context } from "../context"
import { ref, onValue, remove } from 'firebase/database'
import { useNavigate } from "react-router-dom"

export default function Chats() {

    const navigate = useNavigate()

    const { user, database } = useContext(Context)

    const [sessions, setSessions] = useState([])

    function deleteSession(id) {
        setSessions(prev => {
            return prev.filter(session => session.sessionId !== id)
        })
        remove(ref(database, `users/${user.uid}/sessions/${id}`))
    }

    useEffect(() => {
        onValue(ref(database, `users/${user.uid}/sessions`), snapshot => {
            let sessions = []
            snapshot.forEach(childSnapshot => {
                const sessionMessages = Object.values(childSnapshot.val())
                const session = {
                    sessionId: childSnapshot.key,
                    sessionMessages
                }
                sessions.push(session)
            })
            setSessions(sessions)
        }, {onlyOnce: true})
        /* eslint-disable */
    }, [user])


    return <div className="flex flex-col gap-2 p-4">

        <div 
            className="p-6 border flex justify-center gap-2 text-blue-900 font-semibold mb-3 border-blue-700"
            onClick={() => {
                navigate('/application', {state: null})
            }}
            >
            Ask PickFlick
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </div>
        {
            sessions.length > 0 ?
            <><p className="text-sm text-slate-500">Previous Recommendations:</p>
            {sessions.map(session => <SessionLink key={session.sessionId} deleteSession={deleteSession} session={session} />)}</>
            : <div className='text-center mt-32'>
                <p className="text-slate-700 mb-1">Nothing Here Yet</p>
                <p className="text-sm text-slate-500">Click on 'Ask PickFlick' to find your next movie!</p>
            </div>
        }
    </div>
}

function SessionLink(props) {
    const navigate = useNavigate()
    const messages = props.session.sessionMessages

    function goToSession() {
        navigate('/application', {state: props.session.sessionId})
    }

    return <div 
        className="p-1 border-b border-slate-400 flex justify-between hover:cursor-pointer"
        >
        <p 
            className="truncate"
            onClick={goToSession}
            >
            {messages.length > 0 ? messages[0].message : 'Unamed'}
        </p>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6 flex-shrink-0 ml-2 text-red-400"
            onClick={() => props.deleteSession(props.session.sessionId)}
            >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
    </div>
}