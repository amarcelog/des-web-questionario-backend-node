const criaTabelaUsuarios = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    deleted_at TIMESTAMP NULL
  );
`;

const criaTabelaPerguntas = `
  CREATE TABLE IF NOT EXISTS perguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT NOT NULL,
    deleted_at TIMESTAMP NULL
  );
`;

const criaTabelaPerguntaOpcoes = `
  CREATE TABLE IF NOT EXISTS pergunta_opcoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pergunta INT,
    descricao TEXT NOT NULL,
    pontos INT NOT NULL,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (id_pergunta) REFERENCES perguntas(id)
  );
`;

const criaTabelaQuestRespondidas = `
  CREATE TABLE IF NOT EXISTS quest_respondidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    datahorainicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    datahorafim TIMESTAMP NULL,
    pontuacao INT,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
  );
`;

const criaTabelaRespostas = `
  CREATE TABLE IF NOT EXISTS respostas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pergunta INT,
    id_opcao INT,
    id_quest INT,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (id_pergunta) REFERENCES perguntas(id),
    FOREIGN KEY (id_opcao) REFERENCES pergunta_opcoes(id),
    FOREIGN KEY (id_quest) REFERENCES quest_respondidas(id)
  );
`;

export async function criarTabelas(conexao) {
  console.log("Sincronizando banco de dados...");
  await conexao.query(criaTabelaUsuarios);
  await conexao.query(criaTabelaPerguntas);
  await conexao.query(criaTabelaPerguntaOpcoes);
  await conexao.query(criaTabelaQuestRespondidas);
  await conexao.query(criaTabelaRespostas);
  console.log("Sincronização finalizada.");
}

/* 
    O campo deleted_at foi adicionado em todas as tabelas para implementar o softdelete. Quando este campo é NULL, o registro é considerado ativo. Quando contém um timestamp, 
    o registro é considerado "deletado".
    As chaves estrangeiras foram mantidas conforme solicitado.
    A tabela quest_respondidas usa TIMESTAMP DEFAULT CURRENT_TIMESTAMP para datahorainicio para automaticamente registrar o momento de início.
    datahorafim na tabela quest_respondidas é inicialmente NULL e pode ser atualizado quando o questionário for finalizado.
*/
