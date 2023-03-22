import { useContext, useEffect, useState } from "react"
import { Context } from "../context"

export default function Movie(props) {
    
    const { subscription } = useContext(Context)

    // Object keys: poster, title, plot
    const [movieData, setMovieData] = useState({})

    // If this movie doesn't have a poster, then don't show it.
    const hide = (movieData.poster === 'N/A' || !movieData.poster) && 'hidden'


    async function fetchMovieData() {
        const url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&`
        /**
         * If the subscription is curie, then retrieve the movie from the OMdb api
         * by title (t) instead of by imdbId (i).
         * 
         * The Curie AI model doesn't know which imdbIds belong to their respective title.
         */
        if (subscription === 'curie') {
            const res = await fetch(`${url}t=${props.movie.title}`)
            const data = await res.json()
            return data
        } else {
            const res = await fetch(`${url}i=${props.movie.imdbId}`)
            const data = await res.json()
            return data
        }
    }

    useEffect(() => {
        fetchMovieData()
            .then(data => {
                setMovieData({
                    poster: data.Poster, 
                    title: data.Title, 
                    plot: data.Plot
                })
            })
            /* eslint-disable */
    }, [])

    return <div className={`flex h-[71px] h mb-2 ${hide}`}>
        <img className="w-11 flex-shrink-0 mr-3 rounded-sm border border-slate-400" src={movieData.poster} />
        <div className="flex flex-col">
            <p className="text-sm text-slate-50">{movieData.title}</p>
            <p className="text-slate-300 font-light text-xs overflow-hidden">{movieData.plot}</p>
        </div>
    </div>
}