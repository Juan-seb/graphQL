import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FIND_PERSONS } from './persons/graphql-queries'


const Personas = ({ persons }) => {

    // result is an object with the data and loading state.
    const [person, setPerson] = useState(null);
    const [viewPerson, setViewPerson] = useState(false);
    const [getPerson, result] = useLazyQuery(FIND_PERSONS);

    // Use this function to call the query with the name to find.
    const showPerson = async (name) => {
        
        await getPerson({ variables: { nameToFind: name } })
        setViewPerson(true)

    }

    // Use the useEffect hook to update the person state when the result changes.
    // But this is a problem because the useEffect render every time

    useEffect(() => {
        if (result.data) {
            setPerson(result.data.findPerson)
        }
    }, [result])

    if (viewPerson) {
        return (
            <div>
                <h2>{person.name}</h2>
                <div>{person.phone}</div>
                <div>{person.id}</div>
                <button onClick={() => {
                    setViewPerson(false)    
                }}>Cerrar</button>
            </div>
        )
    }

    return (
        <div>
            {persons && persons.map(person => <div key={person.id} onClick={() => showPerson(person.name)}>
                {person.name} {person.phone}
            </div>)}
        </div>
    );
}

export default Personas;