import { conexaoMySql, getConexao } from "../../banco-de-dados/conexaomysql.js";

// Inicializa a conexão MySQL
conexaoMySql();

class QuestRespondidosRepositorio {

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
    finally {

      if(connection){
         connection.release(); 
      }
    }
  }

  // R - Read
  async buscarQuestRespondidaPorId(id) {
    const connection = await getConexao();
    const query = 'SELECT * FROM quest_respondidas WHERE id = ? ';
    try {
      const [rows] = await connection.query(query, [id]);
      await connection.release();
      return rows[0];
    } catch (erro) {
      console.error('Erro ao buscar questionário respondido por ID:', erro);
      throw erro;
    }
    finally {

      if(connection){
         connection.release(); 
      }
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
    finally {

      if(connection){
         connection.release(); 
      }
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
    finally {

      if(connection){
         connection.release(); 
      }
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
    finally {

      if(connection){
         connection.release(); 
      }
    }
  }
 
}

export default QuestRespondidosRepositorio;