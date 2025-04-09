import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/read.css";

const Read = () => {
  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [visivel, setVisivel] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/alunos/")
      .then((res) => res.json())
      .then((data) => setAlunos(data));

    fetch("http://localhost:8000/cursos/")
      .then((res) => res.json())
      .then((data) => setCursos(data));
  }, []);

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Maricá Cursos</h1>
          <p className="subtitle">Visualizar Banco de Dados</p>
          <div className="nav-buttons">
            <button onClick={() => navigate("/add")}>Cadastrar</button>
            <button onClick={() => navigate("/delete")}>Deletar</button>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="visualizar-botoes">
          <button onClick={() => setVisivel("alunos")}>Alunos</button>
          <button onClick={() => setVisivel("cursos")}>Cursos</button>
        </div>

        <main className="conteudo">
          {visivel === "alunos" && (
            <>
              <h2>Alunos Cadastrados</h2>
              <div className="cards">
                {alunos.map((aluno) => (
                  <div className="card" key={aluno.id}>
                    <p><strong>ID:</strong> {aluno.id}</p>
                    <p><strong>Nome:</strong> {aluno.nome}</p>
                    <p><strong>CPF:</strong> {aluno.cpf}</p>
                    <p><strong>Matrícula:</strong> {aluno.matricula}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {visivel === "cursos" && (
            <>
              <h2>Cursos Cadastrados</h2>
              <div className="cards">
                {cursos.map((curso) => (
                  <div className="card" key={curso.id}>
                    <p><strong>ID:</strong> {curso.id}</p>
                    <p><strong>Nome:</strong> {curso.nome}</p>
                    <p><strong>Descrição:</strong> {curso.desc}</p>
                    <p><strong>Carga horária:</strong> {curso.carga_horaria}h</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Maricá Cursos. Todos os direitos reservados.</p>
          <div className="footer-links">
            <a href="#contato">Contato</a>
            <a href="#sobre">Sobre</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Read;
