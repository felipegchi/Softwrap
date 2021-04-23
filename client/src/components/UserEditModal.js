import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalContext } from '../contexts/ModalContext';
import { UserContext } from '../contexts/UserContext';
import UserForm from './UserForm';

function UserEditModal() {
  const [state, setState] = useContext(ModalContext);
  const [, setUsers] = useContext(UserContext);
  const handleClose = () => setState({ action: 'hide' });
  const setUser = (key, value) => setState({ key, value, action: 'change' });
  const submitAndClose = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4040/user/${state.user.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(state.user),
    });
    const data = await res.json();
    if (res.status === 200) {
      setUsers({ action: 'update', id: data.id, user: data });
    }
    handleClose();
  };
  return (
    <Modal show={state.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit an user!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserForm id="adduser" user={state.user} setUser={setUser} onSubmit={submitAndClose} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={submitAndClose}>
          Modificar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserEditModal;
