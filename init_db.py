from sqlalchemy import inspect
from database import Base, engine
from models import Aluno, Curso

print("Tabelas declaradas no SQLALCHEMY:", Base.metadata.tables.keys())

inspector = inspect(engine)
print("Tabelas existentes no Banco de dados: ", inspector.get_table_names())

Base.metadata.create_all(bind=engine)
print("Criação de tabela finalizada com sucesso!")