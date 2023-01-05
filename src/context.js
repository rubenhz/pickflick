import React, { useEffect, useState } from 'react'

const Context = React.createContext()

function ContextProvider(props) {

    const [movieObjects, setMovieObjects] = useState([])
    const [movieTitles, setMovieTitles] = useState([])
    const [prompt, setPrompt] = useState('')
    const [overlayUp, setOverlayUp] = useState(false)
    const [overlayAnimation, setOverlayAnimation] = useState('results-appear')

    useEffect(() => {
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `
                Please recommend up to 3 movies based on the following description: [${prompt}] in the following format: Title - year | Title - year | Title - year
                `,
                max_tokens: 150
            })
        }
        if (prompt) {
            fetch('https://api.openai.com/v1/completions', init)
                .then(res => res.json())
                .then(data => {
                    console.log(parseAIResponse(data))
                    setMovieTitles(parseAIResponse(data))
                })
        }
    }, [prompt])

    useEffect(() => {
        if (movieTitles.length > 0) {
            let movieObjects = []
            movieTitles.forEach(({title, year}) => {
            fetch(`https://www.omdbapi.com/?t=${title}&y=${year}&apikey=a4476bbd`)
                .then(res => res.json())
                .then(data => data.Title && movieObjects.push(data))
                })
            setMovieObjects(movieObjects)
        }
    }, [movieTitles])

    function sendPromptToAI(p) {
        setPrompt(p)
        toggleResultsOverlay()
    }

    function parseAIResponse(response) {
        const text = response.choices[0].text
        return text.trim().split('|').map(title => {
            const [t, y] = title.split('-')
            return {title: t.trim(), year: y.trim()}
        })
    }

    function toggleResultsOverlay() {
        if (!overlayUp) {
            setOverlayAnimation('results-appear')
            setOverlayUp(true)
        } else {
            setOverlayAnimation('results-disappear')
            setTimeout(() => {
                setOverlayUp(false)
            }, 2000)
        }
    }

    return <Context.Provider value={{prompt, movieObjects, sendPromptToAI, toggleResultsOverlay, overlayUp, overlayAnimation}}>
        {props.children}
    </Context.Provider>
}

export {Context, ContextProvider}