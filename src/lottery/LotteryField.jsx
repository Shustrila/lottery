import React, { Component } from 'react';

class LotteryField extends Component {
    constructor(props) {
        super(props);
        this.state = { active: false, selectResult: false};
        this.itemRef = React.createRef(); 
        this._clickItemField = this._clickItemField.bind(this);
    }

    _clickItemField() {
        const area = this.props.area;
        const { active } = this.state;
        const { number } = area.state;

        if (number > 0 || (number === 0 && active)) {
            this.setState({ active: !active });
            area.setState({ number:  active ? number + 1 : number - 1});
        }
    }

    render() {
        let classField = 'lottery__item-fields';
        if (this.state.active) classField += ' lottery__item-fields--active';
        if (this.state.selectResult) classField += ' lottery__item-fields--result';

        return (
            <li ref={this.itemRef} 
                className={classField}
                onClick={this._clickItemField }> 
                {this.props.number}
            </li>
        )
    }

    componentDidUpdate = () =>  this.props.getActiveFields();
}

export default LotteryField;