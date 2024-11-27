import heroImg from "../../assets/hero.svg"
import scroll from "../../assets/scroll.svg"
import "./Hero.scss"
const Hero = () => {
    return (<>
        <main className="hero">
            <div className="hero__welcome">
                Welcome to ByBartr!
            </div>
            <div className="hero__image">
                <img src={heroImg} alt="Hero image" />
            </div>
            <div className="hero__body">
                A platform for creatives to trade skills and services
            </div>
            <div className="hero__scroll">
                <img src={scroll} alt="Hero scroll icon" />
            </div>
        </main>

    </>)
}

export default Hero