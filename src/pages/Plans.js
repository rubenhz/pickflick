import Header from "../components/Header";
import Pricing from "../components/Pricing";

export default function Plans() {
    return <div>
        <Header />
        <Pricing subtitle={
            `Choose a plan to start taking advantage
             of PickFlick's powerful AI technology`
        } />
    </div>
}