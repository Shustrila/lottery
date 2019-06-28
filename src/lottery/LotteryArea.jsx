import React, { Component } from 'react';
import LotteryField from './LotteryField.jsx';

class LotteryArea extends Component {
  constructor(props) {
      super(props);
      this.state = { number: 0, fields: [], activeFields: [] };
      this.fieldsRefs = [];

      this.getActiveFields = this.getActiveFields.bind(this);
  }

  getActiveFields() {
    const filter = this.fieldsRefs.filter((item) => item.state.active);

    this.setState({ activeFields: filter.map(item => item.props.number) });
  }

  _renderDesc(number) {
    let desc = `Отметьте ${number} `;
    
    if(number > 4) {
      desc += 'чисел';
    } else if(number > 1) {
      desc += 'числа';
    } else if(number === 1) {
      desc += 'число';
    } else if(number === 0) {
      desc = 'Увы но вы не можете больше выбрать';
    }
    
    return desc;
  }

  _renderitemField(maxfield) { 
    let arr = [];

    for(let i = 0; i < maxfield; i++) {
      arr.push(
        <LotteryField ref={(input) => this.fieldsRefs[i] = input} 
                      key={i}  
                      number={i + 1} 
                      area={ this } 
                      getActiveFields={ this.getActiveFields }/>
      )
    }

    return arr;
  }

  componentWillMount() {
    const { maxfield } = this.props;

    this.setState({ 
      number: this.props.number,
      fields: this._renderitemField(maxfield)
    });
  }

  render() {
    const { number, fields } = this.state;

    return (
      <div className="lottery__area">
        <div className="lottery__area-head">
          <p className="lottery__area-title">
            Первая часть поля
          </p>
          <p className="lottery__area-desc">{ this._renderDesc(number) }</p>
        </div>

        <ul className="lottery__list-fields"> { fields } </ul>
      </div>
    )
  }
}

export default LotteryArea;