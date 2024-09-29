import { conexaoMySql } from "../../banco-de-dados/conexaomysql.js"; 

class Repositorio {
  constructor() {
    this.connection = null; 
  }

  async getConexao() {
    this.connection = await conexaoMySql.getConexao(); 
    return this.connection; 
  }

  // Usuários CRUD

  // C - Create
  async criarUsuario(nome, email) {
    if (!nome || !email) {
      throw new Error('Nome e email são obrigatórios');
    }
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';

    try {
      const [result] = await this.connection.query(query, [nome, email]);
      await this.connection.release();
      return result.insertId;
    } catch (erro) {
      console.error('Erro ao criar usuário:', erro);
      throw erro;
    }
  }

  // R - Read
  async buscarUsuarioPorId(id) {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'SELECT * FROM usuarios WHERE id = ? AND deleted_at IS NULL';

    try {
      const [rows] = await this.connection.query(query, [id]);
      await this.connection.release();
      return rows[0];
    } catch (erro) {
      console.error('Erro ao buscar usuário por ID:', erro);
      throw erro;
    }
  }

  // R - Read - ALL
  async buscarTodosUsuarios() {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'SELECT * FROM usuarios WHERE deleted_at IS NULL';

    try {
      const [rows] = await this.connection.query(query);
      await this.connection.release();
      return rows;
    } catch (erro) {
      console.error('Erro ao buscar todos os usuários:', erro);
      throw erro;
    }
  }

  // U - Update
  async atualizarUsuario(id, nome, email) {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ? AND deleted_at IS NULL';

    try {
      await this.connection.query(query, [nome, email, id]);
      await this.connection.release();
    } catch (erro) {
      console.error('Erro ao atualizar usuário:', erro);
      throw erro;
    }
  }

  // D - Delete (Soft Delete - atualiza deleted_at)
  async deletarUsuario(id) {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'UPDATE usuarios SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?';

    try {
      await this.connection.query(query, [id]);
      await this.connection.release();
    } catch (erro) {
      console.error('Erro ao deletar usuário:', erro);
      throw erro;
    }
  }

  // Perguntas CRUD

  // C - Create
  async criarPergunta(descricao) {
    if (!descricao) {
      throw new Error('Descrição da pergunta é obrigatória');
    }
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'INSERT INTO perguntas (descricao) VALUES (?)';

    try {
      const [result] = await this.connection.query(query, [descricao]);
      await this.connection.release();
      return result.insertId;
    } catch (erro) {
      console.error('Erro ao criar pergunta:', erro);
      throw erro;
    }
  }

  // R - Read
  async buscarPerguntaPorId(id) {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'SELECT * FROM perguntas WHERE id = ? AND deleted_at IS NULL';

    try {
      const [rows] = await this.connection.query(query, [id]);
      await this.connection.release();
      return rows[0];
    } catch (erro) {
      console.error('Erro ao buscar pergunta por ID:', erro);
      throw erro;
    }
  }

  // R - Read - ALL
  async buscarTodasPerguntas() {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'SELECT * FROM perguntas WHERE deleted_at IS NULL';

    try {
      const [rows] = await this.connection.query(query);
      await this.connection.release();
      return rows;
    } catch (erro) {
      console.error('Erro ao buscar todas as perguntas:', erro);
      throw erro;
    }
  }

  // U - Update
  async atualizarPergunta(id, descricao) {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'UPDATE perguntas SET descricao = ? WHERE id = ? AND deleted_at IS NULL';

    try {
      await this.connection.query(query, [descricao, id]);
      await this.connection.release();
    } catch (erro) {
      console.error('Erro ao atualizar pergunta:', erro);
      throw erro;
    }
  }

  // D - Delete (Soft Delete - atualiza deleted_at)
  async deletarPergunta(id) {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'UPDATE perguntas SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?';

    try {
      await this.connection.query(query, [id]);
      await this.connection.release();
    } catch (erro) {
      console.error('Erro ao deletar pergunta:', erro);
      throw erro;
    }
  }

  // PerguntaOpcoes CRUD

  // C - Create
  async criarOpcao(id_pergunta, descricao, pontos) {
    if (!id_pergunta || !descricao || !pontos) {
      throw new Error('ID da pergunta, descrição e pontos são obrigatórios');
    }
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'INSERT INTO pergunta_opcoes (id_pergunta, descricao, pontos) VALUES (?, ?, ?)';

    try {
      const [result] = await this.connection.query(query, [id_pergunta, descricao, pontos]);
      await this.connection.release();
      return result.insertId;
    } catch (erro) {
      console.error('Erro ao criar opção:', erro);
      throw erro;
    }
  }

  // R - Read
  async buscarOpcaoPorId(id) {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'SELECT * FROM pergunta_opcoes WHERE id = ? AND deleted_at IS NULL';

    try {
      const [rows] = await this.connection.query(query, [id]);
      await this.connection.release();
      // Retorne um array, mesmo que contenha apenas um elemento
      return rows; 
    } catch (erro) {
      console.error('Erro ao buscar opção por ID:', erro);
      throw erro;
    }
  }


  // R - Read - ALL
  async buscarTodasOpcoes() {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'SELECT * FROM pergunta_opcoes WHERE deleted_at IS NULL';

    try {
      const [rows] = await this.connection.query(query);
      await this.connection.release();
      return rows;
    } catch (erro) {
      console.error('Erro ao buscar todas as opções:', erro);
      throw erro;
    }
  }

  // U - Update
  async atualizarOpcao(id, opcao) {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'UPDATE pergunta_opcoes SET descricao = ?, pontos = ? WHERE id = ? AND deleted_at IS NULL';

    try {
      await this.connection.query(query, [opcao.descricao, opcao.pontos, id]);
      await this.connection.release();
    } catch (erro) {
      console.error('Erro ao atualizar opção:', erro);
      throw erro;
    }
  }

  // D - Delete (Soft Delete - atualiza deleted_at)
  async deletarOpcao(id) {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'UPDATE pergunta_opcoes SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?';

    try {
      await this.connection.query(query, [id]);
      await this.connection.release();
    } catch (erro) {
      console.error('Erro ao deletar opção:', erro);
      throw erro;
    }
  }

  // QuestRespondidas CRUD

  // C - Create
  async criarQuestRespondida(id_usuario) {
    if (!id_usuario) {
      throw new Error('ID do usuário é obrigatório');
    }
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'INSERT INTO quest_respondidas (id_usuario, datahorainicio) VALUES (?, CURRENT_TIMESTAMP)';

    try {
      const [result] = await this.connection.query(query, [id_usuario]);
      await this.connection.release();
      return result.insertId;
    } catch (erro) {
      console.error('Erro ao criar questionário respondido:', erro);
      throw erro;
    }
  }

  // R - Read
  async buscarQuestRespondidaPorId(id) {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'SELECT * FROM quest_respondidas WHERE id = ? AND deleted_at IS NULL';

    try {
      const [rows] = await this.connection.query(query, [id]);
      await this.connection.release();
      return rows[0];
    } catch (erro) {
      console.error('Erro ao buscar questionário respondido por ID:', erro);
      throw erro;
    }
  }

  // R - Read - ALL
  async buscarTodosQuestRespondidas() {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'SELECT * FROM quest_respondidas WHERE deleted_at IS NULL';

    try {
      const [rows] = await this.connection.query(query);
      await this.connection.release();
      return rows;
    } catch (erro) {
      console.error('Erro ao buscar todos os questionários respondidos:', erro);
      throw erro;
    }
  }

  // U - Update (Finalizar questionário)
  async finalizarQuestionario(id) {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = `
      UPDATE quest_respondidas 
      SET datahorafim = CURRENT_TIMESTAMP,
          pontuacao = (
            SELECT SUM(po.pontos)
            FROM respostas r
            JOIN pergunta_opcoes po ON r.id_opcao = po.id
            WHERE r.id_quest = ?
          )
      WHERE id = ? AND deleted_at IS NULL
    `;
    try {
      await this.connection.query(query, [id, id]);
      await this.connection.release();
    } catch (erro) {
      console.error('Erro ao finalizar questionário:', erro);
      throw erro;
    }
  }

  // D - Delete (Soft Delete - atualiza deleted_at)
  async deletarQuestRespondida(id) {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'UPDATE quest_respondidas SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?';

    try {
      await this.connection.query(query, [id]);
      await this.connection.release();
    } catch (erro) {
      console.error('Erro ao deletar questionário respondido:', erro);
      throw erro;
    }
  }

  // Respostas CRUD

  // C - Create
  async criarResposta(id_quest, id_opcao) {
    if (!id_quest || !id_opcao) {
      throw new Error('ID do questionário e ID da opção são obrigatórios');
    }
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'INSERT INTO respostas (id_quest, id_opcao) VALUES (?, ?)';

    try {
      const [result] = await this.connection.query(query, [id_quest, id_opcao]);
      await this.connection.release();
      return result.insertId;
    } catch (erro) {
      console.error('Erro ao criar resposta:', erro);
      throw erro;
    }
  }

  // R - Read
  async buscarRespostaPorId(id) {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'SELECT * FROM respostas WHERE id = ? AND deleted_at IS NULL';

    try {
      const [rows] = await this.connection.query(query, [id]);
      await this.connection.release();
      return rows[0];
    } catch (erro) {
      console.error('Erro ao buscar resposta por ID:', erro);
      throw erro;
    }
  }

  // R - Read - ALL
  async buscarTodasRespostas() {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'SELECT * FROM respostas WHERE deleted_at IS NULL';

    try {
      const [rows] = await this.connection.query(query);
      await this.connection.release();
      return rows;
    } catch (erro) {
      console.error('Erro ao buscar todas as respostas:', erro);
      throw erro;
    }
  }

  // U - Update
  async atualizarResposta(id, id_opcao) {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'UPDATE respostas SET id_opcao = ? WHERE id = ? AND deleted_at IS NULL';

    try {
      await this.connection.query(query, [id_opcao, id]);
      await this.connection.release();
    } catch (erro) {
      console.error('Erro ao atualizar resposta:', erro);
      throw erro;
    }
  }

  // D - Delete (Soft Delete - atualiza deleted_at)
  async deletarResposta(id) {
    await this.getConexao(); // Chama getConexao() antes de usar a conexão
    const query = 'UPDATE respostas SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?';

    try {
      await this.connection.query(query, [id]);
      await this.connection.release();
    } catch (erro) {
      console.error('Erro ao deletar resposta:', erro);
      throw erro;
    }
  }
}

export default Repositorio;



