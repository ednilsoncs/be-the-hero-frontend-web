import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import herosImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';

export function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/sessions', { id });
      await localStorage.setItem('ongName', data.name);
      await localStorage.setItem('ongId', id);
      history.push('/profile');
    } catch (e) {
      alert('Falha no login');
    }
  };
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" /> Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={herosImg} alt="Heros" />
    </div>
  );
}

export default Logon;
