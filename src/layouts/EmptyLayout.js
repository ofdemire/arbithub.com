import React from 'react';


const EmptyLayout = props => {
    return(
        <div>
            <div className="main">
                {props.children}
            </div>
            
        </div>

    );

};

export default EmptyLayout;