import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../context'

export default function PromptForm(props) {
    const textareaRef = useRef()

    const {sendPromptToAI} = useContext(Context)

    const [text, setText] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        sendPromptToAI(text)
        setText('')
    }

    function handleChange(e) {
        setText(e.target.value)
    }

    useEffect(() => {
        const textarea = textareaRef.current
        textarea.style.height = '16px'
        textarea.style.height = `${textarea.scrollHeight}px`
    }, [text])

    return <form 
        className='prompt-form' 
        onSubmit={handleSubmit}
        onKeyDown={e => (e.key === 'Enter') && handleSubmit(e)}
        style={props.style}
        >
        <textarea
            ref={textareaRef}
            className='text-input'
            type='text'
            value={text}
            onChange={handleChange}
        />
        <button type='submit'>
            <img src="https://img.icons8.com/ios-glyphs/30/000000/filled-sent.png" alt=''/>
        </button>
    </form>
}