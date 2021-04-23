import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { ModalContext } from '../contexts/ModalContext';
import { UserContext } from '../contexts/UserContext';

const civilStates = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'Separado(a)'];
function UserCard({ user }) {
  const [, setUsers] = useContext(UserContext);
  const [, setState] = useContext(ModalContext);
  async function deleteUser(id) {
    await fetch(`http://localhost:4040/user/${id}`, {
      method: 'DELETE',
      mode: 'cors',
    });
    setUsers({ action: 'remove', id: user.id });
  }
  const showModel = async () => {
    setState({ action: 'show', user });
  };
  return (
    <tr>
      <td>{user.fullname}</td>
      <td>{user.age}</td>
      <td>{civilStates[user.civil_state]}</td>
      <td>{user.cpf}</td>
      <td>{user.city}</td>
      <td>{user.state}</td>
      <td>
        Idade
      </td>
      <td>
        <Button variant="primary" onClick={showModel} className="mr-4">Editar</Button>
      </td>
      <td>
        <Card.Link style={{ cursor: 'pointer' }} onClick={() => deleteUser(user.id)}>Remover</Card.Link>
      </td>
    </tr>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    age: PropTypes.number,
    civil_state: PropTypes.string,
    cpf: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};

export default UserCard;
