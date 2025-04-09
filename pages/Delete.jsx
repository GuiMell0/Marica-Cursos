import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/delete.css";

function Delete() {
  const [tipo, setTipo] = useState("aluno");
  const [id, setId] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const deletarPorId = async () => {
    if (!id) {
      setMensagem("Informe um ID válido.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/${tipo}s/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao deletar");

      await res.json();
      setMensagem(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} com ID ${id} deletado com sucesso.`);
      setId("");
    } catch (error) {
      setMensagem("Erro ao deletar. Verifique o ID ou tente novamente.");
    }
  };

  const deletarTodos = async () => {
    try {
      const res = await fetch(`http://localhost:8000/${tipo}s/`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao deletar todos");

      const data = await res.json();
      setMensagem(data.mensagem || `Todos os ${tipo}s foram deletados com sucesso.`);
    } catch (error) {
      setMensagem("Erro ao deletar todos os dados.");
    }
  };

  return (
    <div className="delete-container">
      <header className="header">
        <div className="header-content">
          <div className="logo">Maricá Cursos</div>
          <p className="subtitulo-header">Excluir Dados de Alunos e Cursos</p>
          <div className="nav-buttons">
            <button onClick={() => navigate("/")}>Visualizar</button>
            <button onClick={() => navigate("/add")}>Cadastrar</button>
          </div>
        </div>
      </header>

      <main className="delete-main container">
        <h2>Deletar Dados</h2>

        <div className="tipo-botoes">
          <button onClick={() => setTipo("aluno")} className={tipo === "aluno" ? "ativo" : ""}>Aluno</button>
          <button onClick={() => setTipo("curso")} className={tipo === "curso" ? "ativo" : ""}>Curso</button>
        </div>

        <div className="form-delete">
          <input
            type="number"
            placeholder={`ID do ${tipo}`}
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button onClick={deletarPorId}>Deletar por ID</button>
        </div>

        <div className="form-delete">
          <button onClick={deletarTodos} className="delete-all">Deletar TODOS os {tipo}s</button>
        </div>

        {mensagem && (
          <div className={`mensagem-cadastro ${mensagem.includes("sucesso") ? "sucesso" : "erro"}`}>
            <strong>{mensagem}</strong>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Maricá Cursos - Todos os direitos reservados.</p>
          <div className="footer-links">
            <a href="#">Contato</a>
            <a href="#">Sobre</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Delete;
