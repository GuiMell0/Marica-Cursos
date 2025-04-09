from sqlalchemy import create_engine 

DATABASE_URL = 'mysql+pymysql://root:mello0924@localhost/sistema_db'
engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        print("Conectado com sucesso!")
except Exception as e:
    print("Erro ao conectar o banco de dados")
