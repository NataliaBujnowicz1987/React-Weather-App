import React from 'react';

// we used props assigned in class component called App (App.js)
const Form = (props) => {
    return (
        <form onSubmit={props.submit}>
            <input
                type="text"
                value={props.value}
                // we want to use it when we change something -> here we change value
                onChange={props.change}
                placeholder="Add your city..." />

            <button>..and check weather!</button>
        </form>
    )
}

export default Form;