import { useContext, useEffect, useState } from "react"
import { Context } from "../context"
import MovieCard from "./MovieCard"

export default function MovieRecommendations() {

    const {movieObjects} = useContext(Context)

    const [movieCards, setMovieCards] = useState([])

    useEffect(() => {
        const timeout =  setTimeout(() => {
            if (movieCards.length < movieObjects.length) {
                setMovieCards(prev => {
                    return [...prev, <MovieCard {...movieObjects[prev.length]} />]
                })
            }
        }, 200)
        return () => window.clearTimeout(timeout)
    }, [movieCards, movieObjects])
    
    return <div className='movie-recommendations'>
        {movieCards}
    </div>
}