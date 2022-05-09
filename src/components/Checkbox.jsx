import React from "react";

const Checkbox = (props) => {

    const inputRef = React.useRef(null)

    const onChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current)
        }
    }

    return (
        <label className="custom-checkbox">
            <input type="checkbox" ref={inputRef} onChange={onChange} checked={props.checked} />
            <span className="custom-checkbox__checkmark">
                <i className="fa-solid fa-check"></i>
            </span>
            {props.label}
        </label>
    )
}

export default Checkbox