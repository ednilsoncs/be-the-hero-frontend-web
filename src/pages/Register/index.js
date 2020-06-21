import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    const body = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };
    try {
      const { data } = await api.post('ongs', body);
      alert(`Seu ID de acess: ${data.id}`);
      history.push('/');
    } catch (e) {
      alert('Erro no cadastro, tente novamente.');
    }
  };
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft className="icon" size={16} color="#E02041" /> Já tenho
            cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              value={uf}
              style={{ width: 80 }}
              onChange={(e) => setUf(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
