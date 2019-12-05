import React from 'react'
import './Button.css'

const getClass = (propName, className) => {
    if (!propName) return null;
    return className;
}

const Button = props => {
    return (
    <div 
        className={`button ${getClass(props.isDoubleWidth, "button-double-width")} ${getClass(props.isOrange, "button-orange")}`}
        onClick={() => props.handleClick(props.text)}>{props.text}</div>
    )
}

export default Button;