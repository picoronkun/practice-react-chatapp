import React from 'react';
import {Answer} from './index'; 

const AnswersList = (props) => {
    return (
        <div className="c-grid__answer">
            <Answer />
            <Answer />
            <Answer />
            <Answer />
        </div>
    )
}

export default AnswersList