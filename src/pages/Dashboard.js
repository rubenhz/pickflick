import Chats from "../components/Chats";
import Header from "../components/Header";

export default function Dashboard() {
    return <div>
        <Header />
        <div className='md:max-w-[1150px] md:mx-auto md:pt-4'>
            <Chats />
        </div>
    </div>
}