import About from "../components/About";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Pricing from "../components/Pricing";

export default function Home() {
    return <>
        <Header />
        <Hero />
        <Features />
        <About />
        <Pricing subtitle='Choose your movie assistant to get started' />
        <Footer />
    </>
}