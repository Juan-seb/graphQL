import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_PERSONS } from './persons/graphql-queries';
import { CREATE_PERSON } from './persons/grapql-mutations';

const initialValues = {
    name: '',
    phone: '',
    street: '',
    city: ''
}

const PersonForm = ({ NotifyError }) => {

    // use the state to save the values of the form fields.
    const [data, setData] = useState(initialValues);
    const [createPerson] = useMutation(CREATE_PERSON, {
        refetchQueries: [{ query: ALL_PERSONS }],
        onError: (error) => {
            //NotifyError stores the error message for pass to the notify component.
            console.log(error);
            NotifyError(error.graphQLErrors[0].message);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use the if conditional to check if the form is valid.
        /* if (condition) {
            
        } */

        // Use the hook useMutation to create a new person.
        createPerson({
            variables: {
                name: data.name,
                phone: data.phone,
                street: data.street,
                city: data.city
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
            <h2>Create a new Person</h2>
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
                <input type="text"
                    value={data.street}
                    onChange={handleChange}
                    name="street"
                    placeholder="Ingrese su calle"
                />
                <input type="text"
                    value={data.city}
                    onChange={handleChange}
                    name="city"
                    placeholder="Ingrese su ciudad"
                />
                <br />
                <button type="submit">Create Person</button>
            </form>
        </>
    )
}

export default PersonForm;