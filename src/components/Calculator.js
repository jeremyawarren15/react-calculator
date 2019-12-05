import React, { Component } from 'react';
import './Calculator.css'
import { Display } from './Display'
import Button from './Button'
import { thisTypeAnnotation } from '@babel/types';

const INITIAL_STATE = {
    value: null,
    display: "0",
    waitingForOperand: false,
    operator: null,
    lastInputOperand: null
};

const OPERATIONS = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '=': (prevValue, nextValue) => nextValue,
}

  class Calculator extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE
    }

    addInput = val => {
        const {display, waitingForOperand} = this.state;
        if (waitingForOperand) {
            this.setState({
                display: val,
                waitingForOperand: false
            })
        } else {
            this.setState({
                display: display === '0' ? val : display + val
            })
        }
    }

    clear = () => {
        this.setState(INITIAL_STATE)
    }

    negate = () => {
        const {display} = this.state;
        if (display === '0') return;

        this.setState({
            display: display.charAt(0) === '-' ? display.substr(1) : '-' + display
        })
    }

    evaluatePercentage = () => {
        const {display} = this.state;
        const percentage = parseFloat(display) / 100;

        this.setState({
            display: percentage.toString()
        })
    }

    addDecimal = () => {
        const {display, waitingForOperand} = this.state;

        if (waitingForOperand){
            this.setState({
                display: '0.',
                waitingForOperand: false
            })
        } else {
            if (display.indexOf('.') !== -1) {
                return;
            }

            this.setState({
                display: display + '.',
                waitingForOperand: false
            })
        }
    }

    performOperation = (nextOperator) => {
        const {display, operator, value, waitingForOperand, lastInputOperand} = this.state
        const newOperand = parseFloat(display)

        if (!value) {
            this.setState({
                value: newOperand,
                lastInputOperand: newOperand
            })
        } else if (operator) {
            if (waitingForOperand && nextOperator !== '=') {
                return this.setState({
                    operator: nextOperator
                })
            }
            
            const currentValue = value || 0;
            const newValue =  OPERATIONS[operator](currentValue, waitingForOperand ? lastInputOperand : newOperand)
                       
            if (!waitingForOperand) {
                this.setState({
                    lastInputOperand: newOperand
                })
            }
            
            this.setState({
                value: newValue,
                display: String(newValue) 
            })
        }
        
        this.setState({
            waitingForOperand: true,
            operator: nextOperator === '=' ? operator : nextOperator
        })
    }

    render() {
        return (
            <div className="calculator">
                <Display displayText={this.state.display} />
                <Button text="C" handleClick={this.clear} />
                <Button text="+/-" handleClick={this.negate} />
                <Button text="%" handleClick={this.evaluatePercentage} /> 
                <Button text="/" handleClick={this.performOperation} isOrange />

                <Button text="7" handleClick={this.addInput} />
                <Button text="8" handleClick={this.addInput} />
                <Button text="9" handleClick={this.addInput} />
                <Button text="*" handleClick={this.performOperation} isOrange />
                
                <Button text="4" handleClick={this.addInput} />
                <Button text="5" handleClick={this.addInput} />
                <Button text="6" handleClick={this.addInput} />
                <Button text="-" handleClick={this.performOperation} isOrange />

                <Button text="1" handleClick={this.addInput} />
                <Button text="2" handleClick={this.addInput} />
                <Button text="3" handleClick={this.addInput} />
                <Button text="+" handleClick={this.performOperation} isOrange />
                
                <Button text="0" handleClick={this.addInput} isDoubleWidth />
                <Button text="." handleClick={this.addDecimal} />
                <Button text="=" handleClick={this.performOperation} />
            </div>
        );
    }
}

export default Calculator;