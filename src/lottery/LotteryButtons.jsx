import React, { Component } from 'react';
import magicIcon from './magic-wand.svg';

class LotteryButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {  clickFastFill, clickResult } = this.props;

        return (
            <div className="lottery__buttons">
                <button className="lottery__button lottery__button-fast-fill" onClick={ clickFastFill }> 
                    <img className='lottery__icon-fast-fill' src={ magicIcon } alt="magic-icon"/>
                </button>
                <button className="lottery__button lottery__button-result" onClick={ clickResult }> 
                    Показать результат  
                </button>
            </div>
        )
    }
}

export default LotteryButtons;