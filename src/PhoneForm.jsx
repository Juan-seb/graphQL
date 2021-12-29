import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_NUMBER } from './persons/grapql-mutations';

const initialValues = {
    name: '',
    phone: '',
}

const PhoneForm = () => {

    // use the state to save the values of the form fields.
    const [data, setData] = useState(initialValues)
    const [editNumber,result] = useMutation(EDIT_NUMBER)

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use the if conditional to check if the form is valid.
        /* if (condition) {
            
        } */

        // Use the hook useMutation to create a new person.
        editNumber({
            variables: {
                name: data.name,
                phone: data.phone,
            }
        })
        
        setData(initialValues);

    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <h2>Change a phone</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={data.name}
                    onChange={handleChange}
                    name="name"
                    placeholder="Ingrese su nombre"
                />
                <input type="text"
                    value={data.phone}
                    onChange={handleChange}
                    name="phone"
                    placeholder="Ingrese el telefono"
                />
                <br />
                <button type="submit">Edit phone</button>
            </form>
        </>
    )
}

export default PhoneForm;