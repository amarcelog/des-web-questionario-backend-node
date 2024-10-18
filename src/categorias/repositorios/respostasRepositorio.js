import { conexaoMySql, getConexao } from "../../banco-de-dados/conexaomysql.js";

// Inicializa a conexão MySQL
conexaoMySql();

class RespostasRepositorio {

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
    finally {

      if(connection){
         connection.release(); 
      }
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
    finally {

      if(connection){
         connection.release(); 
      }
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
    finally {

      if(connection){
         connection.release(); 
      }
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
    finally {

      if(connection){
         connection.release(); 
      }
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
    finally {

      if(connection){
         connection.release(); 
      }
    }
  }
}

export default RespostasRepositorio;