import React from 'react'

export const Button = ({onClick,label}) => {
    return (
        <div>
            <button onClick={onClick}>{label}</button>
        </div>
    )
}
