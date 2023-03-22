import { Bars } from "react-loader-spinner"
import Movie from "./Movie"

export default function Message(props) {

    function messageBody() {
        if (props.message.source === 'client') {
            return <p className="text-slate-50 text-sm">{props.message.message}</p>
        } else if (props.message.source === 'server' && props.message.loading) {
            return <Bars
                height="30"
                width="30"
                color="rgb(248, 250, 252)"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        } else if (props.message.source === 'server') {
            if (props.message.movies) {
                const movieElements = props.message.source === 'server' && props.message.movies.map(movie => {
                    return <Movie movie={movie} />
                })
                return <div>{movieElements}</div>
            } else {
                return <div className="text-slate-50 text-sm">
                    <p>
                        {props.message.message}
                    </p>
                </div>
            }
        } 
    }

    return <div className='flex mb-3 items-end'>
        {props.message.source !== 'client' && <p className="text-sm font-semibold text-blue-700 border border-blue-500 rounded-full py-1 px-[6px] mr-2">PF</p>}
        <div className={`
            bg-slate-500 
            ${props.message.source === 'client' ? 'ml-auto rounded-md rounded-br-none' : 'rounded-md rounded-bl-none'}
            p-2
        `}>
            {
                messageBody()
            }
        </div>
    </div>
}