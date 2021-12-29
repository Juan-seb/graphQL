import {gql} from '@apollo/client';

export const ALL_PERSONS = gql`
    query {
    allPersons {
      id
      name
      phone
      adress {
        street
        city
      }
    }
  }
`

export const FIND_PERSONS = gql`
    query findPersonByName ($nameToFind: String!){
        findPerson(name: $nameToFind) {
            name
            phone
            id
        }
    }
`