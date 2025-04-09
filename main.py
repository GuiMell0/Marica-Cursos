from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db
from models import Aluno, Curso
from pydantic import BaseModel

app = FastAPI()

origens = [
    "http://localhost:3000",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origens,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AlunoCreate(BaseModel):
    nome: str
    cpf: str
    matricula: int

class CursoCreate(BaseModel):
    nome: str
    desc: str
    carga_horaria: int

class ProfessorCreate(BaseModel):
    nome: str
    curso_ministrado: str

@app.post("/alunos/")
def create_aluno(aluno: AlunoCreate, db: Session = Depends(get_db)):
    db_aluno = Aluno(nome=aluno.nome, cpf=aluno.cpf, matricula=aluno.matricula)
    db.add(db_aluno)
    db.commit()
    db.refresh(db_aluno)
    return db_aluno

@app.get("/alunos/")
def get_alunos(db: Session = Depends(get_db)):
    return db.query(Aluno).all()

@app.get("/alunos/{aluno_id}")
def get_aluno(aluno_id: int, db: Session = Depends(get_db)):
    aluno = db.query(Aluno).filter(Aluno.id == aluno_id).first()
    if not aluno:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return aluno

@app.delete("/alunos/")
def delete_alunos(db: Session = Depends(get_db)):
    deletar = db.query(Aluno).delete()
    db.commit()
    return deletar

@app.delete("/alunos/{aluno_id}")
def deletar_aluno(aluno_id: int, db: Session = Depends(get_db)):
    aluno = db.query(Aluno).filter(Aluno.id == aluno_id).first()
    if not aluno:
        raise HTTPException(status_code=404, detail="Aluno não encontrado")
    db.delete(aluno)
    db.commit()
    return aluno

@app.put("/alunos/{aluno_id}")
def update_aluno(aluno_id: int, aluno_update: AlunoCreate, db: Session = Depends(get_db)):
    aluno = db.query(Aluno).filter(Aluno.id == aluno_id).first()
    if not aluno:
        raise HTTPException(status_code=404, detail="Aluno não encontrado")
    
    for var, value in vars(aluno_update).items():
        setattr(aluno, var, value) if value else None
    
    db.commit()
    db.refresh(aluno)
    return aluno

@app.post("/cursos/")
def create_curso(curso: CursoCreate, db: Session = Depends(get_db)):
    db_curso = Curso(nome=curso.nome, desc=curso.desc, carga_horaria=curso.carga_horaria)
    db.add(db_curso)
    db.commit()
    db.refresh(db_curso)
    return db_curso

@app.get("/cursos/")
def get_cursos(db: Session = Depends(get_db)):
    return db.query(Curso).all()

@app.get("/cursos/{curso_id}")
def get_curso(curso_id: int, db: Session = Depends(get_db)):
    curso = db.query(Curso).filter(Curso.id == curso_id).first()
    if not curso:
        raise HTTPException(status_code=404, detail="Curso não encontrado")
    return curso

@app.delete("/cursos/")
def delete_cursos(db: Session = Depends(get_db)):
    deletar = db.query(Curso).delete()
    db.commit()
    return deletar

@app.delete("/cursos/{curso_id}")
def deletar_curso(curso_id: int, db: Session = Depends(get_db)):
    curso = db.query(Curso).filter(Curso.id == curso_id).first()
    if not curso:
        raise HTTPException(status_code=404, detail="Curso não encontrado")
    db.delete(curso)
    db.commit()
    return curso

@app.put("/cursos/{curso_id}")
def update_curso(curso_id: int, curso_update: CursoCreate, db: Session = Depends(get_db)):
    curso = db.query(Curso).filter(Curso.id == curso_id).first()
    if not curso:
        raise HTTPException(status_code=404, detail="Curso não encontrado")
    
    for var, value in vars(curso_update).items():
        setattr(curso, var, value) if value else None
    
    db.commit()
    db.refresh(curso)
    return curso