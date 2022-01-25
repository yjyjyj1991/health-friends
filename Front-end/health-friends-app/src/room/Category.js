import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';

const Category = () => {
    return (
        <div className ='roomType' >
            <ButtonGroup>
                <Button variant='outlined'>All</Button>
                <Button variant='outlined'>헬스</Button>
                <Button variant='outlined'>요가</Button>
                <Button variant='outlined'>필라테스</Button>
                <Button variant='outlined'>기타</Button>
            </ButtonGroup> 
        </div>
    );
};

export default Category;