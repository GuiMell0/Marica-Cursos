from sqlalchemy import Column, String, Integer
from database import Base

class Aluno(Base):
    __tablename__ = "alunos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    cpf = Column(String(14), unique=True, nullable=False)
    matricula = Column(Integer, unique=True, nullable=False)

class Curso(Base):
    __tablename__ = "cursos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    desc = Column(String(200), nullable=False)
    carga_horaria = Column(Integer, nullable=False)