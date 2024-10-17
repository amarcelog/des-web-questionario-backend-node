import { conexaoMySql, getConexao } from "../../banco-de-dados/conexaomysql.js";

// Inicializa a conexão MySQL
conexaoMySql();

class Repositorio {

  // QuestRespondidas CRUD

  // C - Create
  async criarQuestRespondida(id_usuario) {
    const connection = await getConexao();
    const query = 'INSERT INTO quest_respondidas (id_usuario, datahorainicio) VALUES (?, NOW())';
    try {
      const [result] = await connection.query(query, [id_usuario]);
      await connection.release();
      return result.insertId;
    } catch (erro) {
      console.error('Erro ao criar questionário respondido:', erro);
      throw erro;
    }
  }

  // R - Read
  async buscarQuestRespondidaPorId(id) {
    const connection = await getConexao();
    const query = 'SELECT * FROM quest_respondidas WHERE id = ? AND deleted_at IS NULL';
    try {
      const [rows] = await connection.query(query, [id]);
      await connection.release();
      return rows[0];
    } catch (erro) {
      console.error('Erro ao buscar questionário respondido por ID:', erro);
      throw erro;
    }
  }

  // R - Read - ALL
  async buscarTodosQuestRespondidas() {
    const connection = await getConexao();
    const query = 'SELECT * FROM quest_respondidas WHERE deleted_at IS NULL';
    try {
      const [rows] = await connection.query(query);
      await connection.release();
      return rows;
    } catch (erro) {
      console.error('Erro ao buscar todos os questionários respondidos:', erro);
      throw erro;
    }
  }

  // U - Update (Finalizar questionário)
  async finalizarQuestionario(id) {
    const connection = await getConexao();
    const query = `
      UPDATE quest_respondidas 
      SET datahorafim = NOW(),
          pontuacao = (
            SELECT SUM(po.pontos)
            FROM respostas r
            JOIN pergunta_opcoes po ON r.id_opcao = po.id
            WHERE r.id_quest = ?
          )
      WHERE id = ? AND deleted_at IS NULL
    `;
    try {
      await connection.query(query, [id, id]);
      await connection.release();
    } catch (erro) {
      console.error('Erro ao finalizar questionário:', erro);
      throw erro;
    }
  }

  // D - Delete (Soft Delete - atualiza deleted_at)
  async deletarQuestRespondida(id) {
    const connection = await getConexao();
    const query = 'UPDATE quest_respondidas SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?';
    try {
      await connection.query(query, [id]);
      await connection.release();
    } catch (erro) {
      console.error('Erro ao deletar questionário respondido:', erro);
      throw erro;
    }
  }

  // Respostas CRUD

  // C - Create
  async criarResposta(id_quest, id_opcao) {
    const connection = await getConexao();
    const query = 'INSERT INTO respostas (id_quest, id_opcao) VALUES (?, ?)';
    try {
      const [result] = await connection.query(query, [id_quest, id_opcao]);
      await connection.release();
      return result.insertId;
    } catch (erro) {
      console.error('Erro ao criar resposta:', erro);
      throw erro;
    }
  }

  // R - Read
  async buscarRespostaPorId(id) {
    const connection = await getConexao();
    const query = 'SELECT * FROM respostas WHERE id = ? AND deleted_at IS NULL';
    try {
      const [rows] = await connection.query(query, [id]);
      await connection.release();
      return rows[0];
    } catch (erro) {
      console.error('Erro ao buscar resposta por ID:', erro);
      throw erro;
    }
  }

  // R - Read - ALL
  async buscarTodasRespostas() {
    const connection = await getConexao();
    const query = 'SELECT * FROM respostas WHERE deleted_at IS NULL';
    try {
      const [rows] = await connection.query(query);
      await connection.release();
      return rows;
    } catch (erro) {
      console.error('Erro ao buscar todas as respostas:', erro);
      throw erro;
    }
  }

  // U - Update
  async atualizarResposta(id, id_opcao) {
    const connection = await getConexao();
    const query = 'UPDATE respostas SET id_opcao = ? WHERE id = ? AND deleted_at IS NULL';
    try {
      await connection.query(query, [id_opcao, id]);
      await connection.release();
    } catch (erro) {
      console.error('Erro ao atualizar resposta:', erro);
      throw erro;
    }
  }

  // D - Delete (Soft Delete - atualiza deleted_at)
  async deletarResposta(id) {
    const connection = await getConexao();
    const query = 'UPDATE respostas SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?';
    try {
      await connection.query(query, [id]);
      await connection.release();
    } catch (erro) {
      console.error('Erro ao deletar resposta:', erro);
      throw erro;
    }
  }
}

export default Repositorio;