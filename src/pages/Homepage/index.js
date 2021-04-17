import React from 'react';
import HeroSection from '../../components/HeroSection';
import Pricing from '../../components/Pricing';
import {homeObjOne, homeObjTwo, homeObjThree, homeObjFour} from './Data'


const Home = props =>{
    return (
        <>
            <HeroSection {...homeObjOne}/>
            <HeroSection {...homeObjThree}/>
            <HeroSection {...homeObjTwo}/>
            {/* <Pricing /> */}
            <HeroSection {...homeObjFour}/>
        </>
    );
}

export default Home;