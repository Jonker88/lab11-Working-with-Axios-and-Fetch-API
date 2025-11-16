import React, { Component } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

class PersonList extends Component {
  state = {
    persons: []
  };

  componentDidMount() {
    axios
      .get('https://randomuser.me/api/?results=10')
      .then(res => {
        console.log(res.data);
        const persons = res.data.results;
        this.setState({ persons });
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }

  render() {
    return (
      <Container className="mt-4">
        <h2 className="mb-3">Random Users (Axios Example)</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {this.state.persons.map((person, index) => (
              <tr key={person.login.uuid}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={person.picture.thumbnail}
                    alt="avatar"
                    style={{ borderRadius: '50%' }}
                  />
                </td>
                <td>
                  {person.name.title} {person.name.first} {person.name.last}
                </td>
                <td>{person.email}</td>
                <td>{person.location.country}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default PersonList;
