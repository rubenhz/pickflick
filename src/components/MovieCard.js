import { useState } from "react"

export default function MovieCard(props) {

    const [showPlot, setShowPlot] = useState(false)
    const [hover, setHover] = useState(false)

    const showPlotStyle = {
        animationName: showPlot && 'showPlot',
        cursor: hover && 'pointer'
    }

    function extractFromArray(prefferedIndex, key, array) {
        try {
            return array.map(r => r[key])[prefferedIndex]
        } catch {
            return 'N/A'
        }
    }

    const metatadata = {
        title: props.Title,
        poster: props.Poster,
        rating: extractFromArray(1, 'Value', props.Ratings),
        ratingSource: extractFromArray(1, 'Source', props.Ratings),
        runtime: props.Runtime,
        rated: props.Rated,
        plot: props.Plot
    }

    const {title, poster, rating, ratingSource, runtime, rated, plot} = metatadata

    return <div className='movie-card'>
        <img src={poster} alt='movie poster'/>
        <div>
            <h3>{title}</h3>
            <ul className='movie-card--info-list'>
                <li>{ratingSource}: {rating}</li>
                <li>Runtime: {runtime}</li>
                <li>Rated: <b>{rated}</b></li>
            </ul>
            <a href={`https://www.imdb.com/title/${props.imdbID}/`}>
                Visit IMDB site
            </a>
            <div 
                onClick={() => setShowPlot(prev => !prev)}
                className='plot' 
                style={showPlotStyle}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                >
                {showPlot && plot}
            </div>
        </div>
        
    </div>
}