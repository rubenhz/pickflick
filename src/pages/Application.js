import { useContext, useEffect, useRef, useState } from "react"
import Header from "../components/Header"
import { Context } from "../context"
import { ref, push, get } from 'firebase/database'
import { nanoid } from "nanoid"
import Message from "../components/Message"
import { openai } from "../openaiConfig"
import { Link, useLocation } from "react-router-dom"

class MessageData {
    constructor(source, message, movies = [], loading = false) {
        if (source !== 'server' && source !== 'client') {
            throw new Error('Source must be either "server" or "client"')
        }
        if (!Array.isArray(movies)) {
            throw new Error('"movies" must be an array')
        }
        if (source === 'client' && movies.length > 0) {
            console.warn(`
                If the source of the message comes from the client,
                the "movies" array is not used
            `)
        }
        this.source = source
        this.movies = movies
        this.message = message
        this.loading = loading
        this.timestamp = Date.now()
    }

    toObject() {
        return this
    }
}

export default function Application() {

    const { user, database, subscription } = useContext(Context)

    // Receive an existing sessionId if it exists.
    const { state } = useLocation()
    const existingSessionId = state

    // Ref is used to scroll as messages come in.
    const messagesViewRef = useRef(null)

    // Session id. Null if none exists.
    const [sessionId, setSessionId] = useState(existingSessionId)

    useEffect(() => {
        if (!sessionId) {
            const newSessionId = nanoid()
            setSessionId(newSessionId)
        }
        /* eslint-disable */
    }, [sessionId])

    /**
     * `convo` collects new messages and triggers a useEffect that
     * adds the new message to the Firebase Realtime Database.
     * It only stores one message at a time in the format:
     * {source: 'server' or 'client', payload: String, timestamp: Date.now()}
     */
    const [convo, setConvo] = useState(null)

    useEffect(() => {
        const thisSessionRef = ref(database, `users/${user.uid}/sessions/${sessionId}`)
        push(thisSessionRef, convo)
            .then(() => {
                updateExistingMessages()
            })
        /* eslint-disable */
    }, [convo, sessionId])

    /**
     * `existingMessages` receives all existing messages if they exist.
     * Afterwards, it keeps receiveing messages as they are added to the
     * database.
     */
    const [existingMessages, setExistingMessages] = useState([])

    useEffect(() => {
        setTimeout(() => {
            messagesViewRef.current.scrollTop = messagesViewRef.current.scrollHeight
        }, 500)
    }, [existingMessages])

    async function updateExistingMessages() {
        const snapshot = await get(ref(database, `users/${user.uid}/sessions/${sessionId}`))
        if (snapshot.exists()) {
            const messages = Object.values(snapshot.val())
            const lastMessage = messages[messages.length - 1]
            if (lastMessage && lastMessage.source === 'client') {
                const loadingMessage = new MessageData('server', 'Typing...', [], true).toObject()
                setExistingMessages([...messages, loadingMessage])
            } else {
                setExistingMessages(messages)
            }
        }
    }

    const [text, setText] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        const clientMessage = new MessageData('client', text ).toObject()
        setConvo(clientMessage)
        setText('')
        if (subscription) {
            try {
                const models = {
                    'curie': 'text-curie-001',
                    'davinci': 'text-davinci-003'
                }
                const data = await openai.createCompletion({
                    model: models[subscription],
                    prompt: process.env.REACT_APP_OPENAI_PROMPT + `\nparagraph: ${text}\narray:`,
                    max_tokens: 256,
                    temperature: 0.1
                })
                const movies = JSON.parse(data.data.choices[0].text)
                if (movies.length === 0) {
                    throw new Error('The AI model did not yield any results')
                }
                console.log('==> ', movies)
                const serverResponse = new MessageData('server', '', movies).toObject()
                setConvo(serverResponse)
    
            }
            catch (error) {
                console.warn(error.message)
                const errorMsg = "I'm sorry. I can't process this request."
                const serverResponse = new MessageData('server', errorMsg).toObject()
                setConvo(serverResponse)
            }
        } else {
            const message = 'Purchase a subscription to start using PickFlick right away!'
            const serverResponse = new MessageData('server', message).toObject()
            setConvo(serverResponse)
        }
    }

    const messageElements = existingMessages.map((message, index) => {
        return <Message key={index} message={message} />
    })

    function updateSessionId(id) {
        console.log(id)
        setSessionId(id)
    }

    return <div className="h-full flex flex-col">
        <Header />
        <div className="h-full md:max-h-[calc(100%-73px)] md:flex md:flex-1 md:flex-row-reverse md:justify-center">
            <div className="h-full flex flex-col md:max-w-[700px]">
                <div 
                    className={`h-full flex-1 overflow-y-auto pb-4 px-4 bg-blue-50 shadow-inner`}
                    ref={messagesViewRef}
                    >
                    {
                        messageElements.length > 0 ? <div className="mt-4">{messageElements}</div> : <div className="flex h-full">
                            <div>
                                <p className="text-slate-500 my-4"><Link to='/dashboard'>{'< Dashboard'}</Link></p>
                                <h2 className="text-lg text-center font-semibold mb-12">Here you can ask pickflick for movie recommendations.</h2>
                                <p className="mt-5 mb-3 mx-4 text-slate-700">Here are some things to try based on your current plan</p>
                                <ul className="mx-4">
                                    <li className="bg-blue-500 p-2 rounded mb-3 text-slate-50">What's that movie where they steal the Declaration of Independence?</li>
                                    <li className="bg-blue-500 p-2 rounded mb-3 text-slate-50">Recommend movies where the main character is a scientist.</li>
                                    <li className="bg-blue-500 p-2 rounded mb-2 text-slate-50">Horror movies with bad endings in space.</li>
                                </ul>
                            </div>
                        </div>
                    }
                </div>
                <div className="w-full h-28 bg-transparent">
                    <form 
                        className="bg-blue-300 p-3 flex gap-2 h-full"
                        onSubmit={handleSubmit}
                        >
                        <textarea  
                            className="w-full h-full rounded resize-none outline-none p-2 bg-blue-100"
                            onChange={e => setText(e.target.value)}
                            value={text}
                            placeholder='Ask PickFlick...'
                        />
                        <button 
                            className="bg-blue-700 px-4 rounded text-sm"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-blue-100 w-7 h-7">
                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
}