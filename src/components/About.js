import Screenshot from '../assets/pickflick-screenshot.png'

export default function About() {
    return <div className="px-4">
        <div className='flex flex-col items-center mt-20 mb-14'>
            <h2 className='text-2xl font-medium text-slate-900 border-b-blue-700 border-b-2 pb-4 mb-4'>About PickFlick</h2>
            <p className="text-slate-700 font-semibold text-md text-center">
                Learn how Pickflick works and how it helps <span className='font-bold'>you</span> discover new films
            </p>
        </div>
        <div className='flex max-w-[1180px] mx-auto gap-10'>
            <div className='hidden md:flex self-start h-[500px] flex-shrink-0'>
                <img src={Screenshot} alt='PickFlick Screenshot' className='w-[230px] flex-shrink-0 rounded-md border' />
            </div>
            <div className="">
                <h2 className='text-lg font-semibold text-slate-800'>How It Works</h2>
                <p className="mb-5 leading-relaxed">
                Pickflick uses NLP AI to personalize your movie recommendations. Simply type what you're in the mood for and let our algorithms do the rest. Say goodbye to endless scrolling and find your next favorite movie in no time!
                </p>
                <h2 className='text-lg font-semibold text-slate-800'>How It's Useful</h2>
                <p className='leading-relaxed'>
                Pickflick is more than a movie recommendation tool, it's your personal movie assistant. With tailored recommendations, discover new movies and find the perfect movie for any mood or occasion. Say goodbye to endless scrolling and enjoy your next movie night hassle-free with Pickflick!
                </p>
            </div>
        </div>
    </div>
}