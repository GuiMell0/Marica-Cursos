Maricá Cursos - Relatório Técnico

Descrição do Projeto

Este projeto é uma aplicação full-stack voltada para a gestão de alunos e cursos no município de Maricá. Ele permite **cadastrar**, **visualizar** e **deletar** dados, utilizando uma interface amigável feita em React e um back-end leve e rápido utilizando FastAPI com banco de dados SQLite.

Estrutura do Projeto

<pre>```txt
Marica_Curso/
│
├── main.py         # Arquivo principal com os endpoints da API
├── models.py       # Modelos ORM com SQLAlchemy
├── database.py     # Conexão com banco de dados SQLite
├── init_db.py      # Inicializador do banco (criação das tabelas)
└── test_con.py     # Teste de conexão com o banco
│
├── frontend/
│   └── my-app/             # Aplicação React
│       ├── public/
│       └── src/
│           ├── api/        
│           └── pages/      # Páginas principais do sistema
│               ├── css/    # Arquivos de estilo CSS
│               ├── add.jsx
│               ├── read.jsx
│               └── delete.jsx
│── requirements.txt
```txt</pre>

Tecnologias Utilizadas

Front-end:
- **React JS** (JavaScript)
- **HTML5 / CSS3**
- `fetch` para chamadas à API
- Organização em componentes funcionais
- Uso de `useState` e `useEffect`

Back-end:
- **Python 3.11+**
- **FastAPI**
- **SQLAlchemy**
- **Uvicorn**
- **SQLite**

**Como Executar a Aplicação**

Requisitos:
- Node.js (para o front-end)
- Python 3.11+ (para o back-end)

Backend (FastAPI)

1. Acesse a pasta `backend/`
2. Crie um ambiente virtual (opcional, mas recomendado):
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   venv\Scripts\activate     # Windows
   ```
3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
4. Inicie o banco de dados:
   ```bash
   python app/init_db.py
   ```
5. Execute o servidor FastAPI:
   ```bash
   uvicorn app.main:app --reload
   ```

A API estará disponível em: `http://localhost:8000`


Frontend (React)

1. Acesse a pasta `frontend/my-app/`
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o React:
   ```bash
   npm start
   ```

A aplicação será aberta automaticamente em `http://localhost:3000`


Funcionalidades da Aplicação

- Cadastrar novos **alunos** e **cursos**
- Visualizar todos os alunos e cursos existentes
- Deletar por ID ou deletar todos os registros de uma entidade

