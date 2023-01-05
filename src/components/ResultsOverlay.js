import { useContext, useEffect, useState } from "react";
import Typical from "react-typical";
import { Context } from "../context";
import Header from "./Header";
import MovieRecommendations from "./MovieRecommendations";

export default function ResultsOverlay() {

    const [render, setRender] = useState(false)
    const {overlayAnimation} = useContext(Context)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRender(true)
        }, 2000)
        return () => window.clearTimeout(timeout)
    }, [])

    return <div 
        className='results-overlay' 
        style={{animationName: overlayAnimation}}
        >
        <Header goBack />
        <Typical
            className='typic'
            steps={['Here Are Our Recommendations']} 
            wrapper='h2'
        />
        {render && <MovieRecommendations />}

        <button className='movie-recommendations--show-more-btn'>
            Show More
        </button>
    </div>
}