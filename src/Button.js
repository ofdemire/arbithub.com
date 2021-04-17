import React from 'react';
import './components/Button.css';

const STYLES = ['btn--primary', 'btn--outline', 'btn--footer', 'btn--form']

const SIZES = ['btn--medium', 'btn--large', 'btn--mobile', 'btn--wide']

const COLOR = ['primary', 'blue', 'red', 'green']

export const Button =({
     children,
     type,
     onClick, 
     buttonStyle, 
     buttonSize, 
     buttonColor}) =>{
        const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
        const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
        const checkButtonColor = COLOR.includes(buttonColor) ? buttonColor : null;

        const classN = 'btn ' + checkButtonStyle + " " + checkButtonSize + " " + checkButtonColor;


         return(
            <button className={classN} onClick={onClick} type={type}>
                {children}
            </button>
         );
     };