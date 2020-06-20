import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";

import "./styles.css";
import api from "../../services/api";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const history = useHistory();
  const ongId = localStorage.getItem("ongId");
  const handleNewIncident = async (e) => {
    e.preventDefault();
    const body = {
      title,
      description,
      value,
    };
    try {
      await api.post("incidents", body, {
        headers: {
          Authorization: ongId,
        },
      });
      history.push("/profile");
    } catch (e) {
      alert("Erro ao cadastrar caso, tente novamente");
    }
  };
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="logon" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um novo herói para
            resolver isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" /> Voltar para a home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do caso "
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
          />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Valor em reais"
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
