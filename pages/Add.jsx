import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/add.css";

function Add() {
  const [tipoCadastro, setTipoCadastro] = useState("aluno");
  const [formData, setFormData] = useState({});
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/${tipoCadastro}s/`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar");

      const data = await response.json();
      setMensagem(
        `${tipoCadastro.charAt(0).toUpperCase() + tipoCadastro.slice(1)} cadastrado com sucesso: ` +
        JSON.stringify(data)
      );
      setFormData({});
    } catch (error) {
      setMensagem("Erro ao cadastrar");
    }
  };

  const renderForm = () => {
    switch (tipoCadastro) {
      case "aluno":
        return (
          <>
            <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required />
            <input type="text" name="cpf" placeholder="CPF" onChange={handleChange} required />
            <input type="text" name="matricula" placeholder="Matrícula" onChange={handleChange} required />
          </>
        );
      case "curso":
        return (
          <>
            <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required />
            <input type="text" name="desc" placeholder="Descrição" onChange={handleChange} required />
            <input type="number" name="carga_horaria" placeholder="Carga Horária" onChange={handleChange} required />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="logo">Maricá Cursos</div>
          <p className="subtitulo-header">Cadastro de alunos e cursos</p>
          <div className="nav-buttons">
            <button onClick={() => navigate("/")}>Visualizar</button>
            <button onClick={() => navigate("/delete")}>Deletar</button>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="tipo-botoes">
          <button
            className={`btn-cadastro ${tipoCadastro === "aluno" ? "ativo" : ""}`}
            onClick={() => setTipoCadastro("aluno")}
          >
            Cadastrar Aluno
          </button>
          <button
            className={`btn-cadastro ${tipoCadastro === "curso" ? "ativo" : ""}`}
            onClick={() => setTipoCadastro("curso")}
          >
            Cadastrar Curso
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-cadastro">
          {renderForm()}
          <button type="submit">Cadastrar</button>
        </form>

        {mensagem && (
          <div className={`mensagem-cadastro ${mensagem.includes("sucesso") ? "sucesso" : "erro"}`}>
            <strong>{mensagem}</strong>
          </div>
)}

      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Maricá Cursos - Todos os direitos reservados.</p>
          <div className="footer-links">
            <a href="#contato">Contato</a>
            <a href="#sobre">Sobre</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Add;
