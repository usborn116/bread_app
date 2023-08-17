import React from "react";

const Input = ({type, name, placeHolder, val = '', options = null}) => {

    if (type == 'select') return (
        <select name={name} defaultValue={val}>
            {options.map(op => <option key={op.id} value={op.id}>{op.month_name || op.name}</option> )}
        </select>

    )

    return (
        <div className="input">
            <input type={type} name={name} placeholder={placeHolder} defaultValue={val} style={{display: 'block'}}></input>
            <br></br>
        </div>
    )
};

export default Input