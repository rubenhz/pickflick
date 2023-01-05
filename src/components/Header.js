import { useContext } from "react"
import { Context } from "../context"

export default function Header(props) {

    const {toggleResultsOverlay} = useContext(Context)

    return <div className='header'>
        <div className='header--content'>
            <p className='header--logo'>PickFlick</p>
            <div style={{display: 'flex'}}>
                {
                    props.goBack ? 
                        <p className='header--link' onClick={toggleResultsOverlay}> Go Back</p> 
                        : <>
                            <p className='header--link'>About</p>
                            <p className='header--link'>FAQ</p>
                        </>
                }
            </div>
        </div>
    </div>
}