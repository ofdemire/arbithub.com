import React from 'react';
import {Button} from './../../Button';


const PreviousPage = ({
    onLoadMoreEvt = () => { },
}) => {
    return (
        <Button  buttonColor='blue' onClick={() => onLoadMoreEvt()}>
        Previous Page
        </Button>
    );
};

export default PreviousPage;