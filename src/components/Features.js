import Illustration_1 from '../assets/movie-wheel.png'
import Illustration_2 from '../assets/popcorn.png'
import Illustration_3 from '../assets/woman-movie.png'

export default function Features() {
    return <div className='flex flex-col gap-4 mx-4 -mt-24 md:flex-row md:justify-center'>
        <Feature 
            title='Movie Magic' 
            subtitle='Get personalized movie recommendations'
            image={Illustration_1}
        />
        <Feature 
            title='AI Genius' 
            subtitle='Revolutionary movie suggestion technology'
            image={Illustration_2}
        />
        <Feature 
            title='Cinematic Bliss' 
            subtitle='Discover new films effortlessly'
            image={Illustration_3}
        />
    </div>
}

function Feature(props) {
    return <div className="bg-white flex flex-col justify-center items-center px-10 py-12 rounded shadow-md md:w-96 w-full">
        <img className='mb-4' src={props.image} alt=''/>
        <h2 className='text-2xl mb-2 text-center'>{props.title}</h2>
        <p className='text-slate-700 text-center'>{props.subtitle}</p>
    </div>
}