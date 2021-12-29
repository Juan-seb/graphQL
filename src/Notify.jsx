import React from 'react';

const Notify = ({ errorMessage }) => {

    if(!errorMessage) return null;

    const styles = {
        color: 'red',
        position: 'fixed',
        top: '0',
        width: '100%',
        backgroundColor: '#f8d7da',
    }

    return (
        <div style = {styles}>
            {errorMessage}
        </div>
    )
}

export default Notify
