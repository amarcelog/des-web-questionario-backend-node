const criaTabelaUsuarios = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    deleted_at TIMESTAMP NULL DEFAULT NULL
  );
`;

const criaTabelaPerguntas = `
  CREATE TABLE IF NOT EXISTS perguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT(100) NOT NULL,
    deleted_at TIMESTAMP NULL
  );
`;

const criaTabelaPerguntaOpcoes = `
  CREATE TABLE IF NOT EXISTS pergunta_opcoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pergunta INT,
    descricao TEXT(100) NOT NULL,
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

