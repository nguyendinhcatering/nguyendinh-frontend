import React, {useEffect, useState} from 'react';
import {FaArrowCircleDown} from 'react-icons/fa';


const ScrollArrow = () =>{

    const [showScroll, setShowScroll] = useState(false)

    const checkScrollDown = () => {
        if (window.innerHeight < window.pageYOffset && window.pageYOffset < Math.floor(window.document.body.offsetHeight*4/5)){
            setShowScroll(true)
        } else {
            setShowScroll(false)
        }
    };

    const scrollDown = () =>{
        window.scrollTo({top: window.document.body.offsetHeight, behavior: 'smooth'});
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollDown)

    })


    return (
        <FaArrowCircleDown className="scrollBottom" onClick={scrollDown} style={{justifyContent: 'right', height: 40, display: showScroll ? 'flex' : 'none'}}/>
    );
}

export default ScrollArrow;