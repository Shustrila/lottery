import React, { Component } from 'react';
import LotteryArea from "./LotteryArea.jsx";
import LotteryButtons from './LotteryButtons.jsx';
import './Lottery.css';

class Lottery extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            lockResult: false, 
            message: ''
        };
        
        this.areaMainRef = React.createRef();
        this.areaExtraRef = React.createRef();

        this.clickFastFill = this.clickFastFill.bind(this);
        this.clickResult = this.clickResult.bind(this);

        this.lockButtons = false;
    }

    _gererateArray(number, maxfield) {
        const array = [];

        while(true) {
            const randomNumber = Math.floor(Math.random() * maxfield)

            if (!~array.indexOf(randomNumber)) array.push(randomNumber);
            if (array.length === number) break;
        }

        return array; 
    }

    _fastFill(area) {
        const { number, maxfield } =  area.props;

        area.fieldsRefs.forEach(item => item.setState({ active: false }))

        this._gererateArray(number, maxfield).forEach(item => {
            area.setState({ number: 0 });
            area.fieldsRefs[item].setState({ active: true })
        })
    }

    clickFastFill() {
        if (!this.lockButtons) {
            this._fastFill(this.areaMainRef.current);
            this._fastFill(this.areaExtraRef.current);
        }
    }

    _checkNumMatches(area, array) {
        const { activeFields } = area.state;
        const arrMatches = array.filter(item => !!~activeFields.indexOf(item + 1))

        return arrMatches.length;
    }

    endGame(arrResultMain, arrResultExtra) {
        const mainMaches = this._checkNumMatches(this.areaMainRef.current, arrResultMain);
        const extraMaches = this._checkNumMatches(this.areaExtraRef.current, arrResultExtra);
        let message = '';

        if ((mainMaches === 4) || (mainMaches >= 3 && extraMaches === 1)) {
            message = 'Урааа, вы победили!';
        } else {
            message = 'Увы, но вы не выиграли!';
        }

        this.setState({message, lockResult: true})
    }

    _genererateResult(area, num) {
        const { fieldsRefs, props } = area.current;
        const arrResult = this._gererateArray(num, props.maxfield);

        arrResult.forEach(item => fieldsRefs[item].setState({selectResult: true})); 

        return arrResult;
    }

    clickResult() {
        const { state: stateMain } = this.areaMainRef.current;
        const {state: stateExtra } = this.areaExtraRef.current;

        if ((!this.lockButtons) && (stateMain.number === 0 && stateExtra.number === 0)) {
            const arrResultMain = this._genererateResult(this.areaMainRef, 4); 
            const arrResultExtra = this._genererateResult(this.areaExtraRef, 1);

            this.lockButtons = true;

            setTimeout(() => this.endGame(arrResultMain, arrResultExtra), 2000);
        }
    }

    _rendMessage() {
        if (this.state.lockResult) {
            return (
                <div className='lottery__message' onClick={() => this.setState({lockResult: false}) }>
                    { this.state.message }
                </div>
            )
        }
    }

    _rendGame() {
        if (!this.state.lockResult) {
            return (
                <div className="lottery__game">
                    <div className="lottery__ticket">
                        <LotteryArea ref={this.areaMainRef} number={ 8 } maxfield={ 19 } /> 
                        <LotteryArea ref={this.areaExtraRef} number={ 1 } maxfield={ 2 } /> 
                    </div>
                    <LotteryButtons  clickFastFill={this.clickFastFill} clickResult={this.clickResult}  />
                </div>    
            )
        }
    }
    
    render() {
        return (
            <div className="lottery">
                <h3 className="lottery__head">Билет</h3>

                { this._rendMessage() }
                { this._rendGame() }
            </div>
        )
    }
}

export default Lottery;