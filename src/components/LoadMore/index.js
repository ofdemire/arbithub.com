import React from 'react';
import {Button} from './../../Button';


const LoadMore = ({
    onLoadMoreEvt = () => { },
}) => {
    return (
        <Button buttonSize='btn--wide' buttonColor='blue' onClick={() => onLoadMoreEvt()}>
        Load More
        </Button>
    );
};

export default LoadMore;