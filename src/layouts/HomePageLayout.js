import React from 'react';
import Header from './../components/Header';
import Footer from './../pages/Footer';


const HomePageLayout = props => {
    return(
        <div>
            <Header {...props} />
            <div className="main">
                {props.children}
            </div>
            <Footer/>
            
        </div>

    );

};

export default HomePageLayout;