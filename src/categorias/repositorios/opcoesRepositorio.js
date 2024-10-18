import { conexaoMySql, getConexao } from "../../banco-de-dados/conexaomysql.js";

// Inicializa a conexão MySQL
conexaoMySql();

class OpcoesRepositorio {

  // PerguntaOpcoes CRUD

  // C - Create
  async criarOpcao(id_pergunta, descricao, pontos) {
    const connection = await getConexao();
    const query = 'INSERT INTO pergunta_opcoes (id_pergunta, descricao, pontos) VALUES (?, ?, ?)';
    try {
      const [result] = await connection.query(query, [id_pergunta, descricao, pontos]);
      await connection.release();
      return result.insertId;
    } catch (erro) {
      console.error('Erro ao criar opção:', erro);
      throw erro;
    }
    finally {

      if(connection){
         connection.release(); 
      }
    }
  }

  // R - Read
  async buscarOpcaoPorId(id) {
    const connection = await getConexao();
    const query = 'SELECT * FROM pergunta_opcoes WHERE id = ? ';
    try {
      const [rows] = await connection.query(query, [id]);
      await connection.release();
      return rows[0];
    } catch (erro) {
      console.error('Erro ao buscar opção por ID:', erro);
      throw erro;
    }
    finally {

      if(connection){
         connection.release(); 
      }
    }
  }

  // R - Read - ALL
  async buscarTodasOpcoes() {
    const connection = await getConexao();
    const query = 'SELECT * FROM pergunta_opcoes';
    try {
      const [rows] = await connection.query(query);
      await connection.release();
      return rows;
    } catch (erro) {
      console.error('Erro ao buscar todas as opções:', erro);
      throw erro;
    }
    finally {

      if(connection){
         connection.release(); 
      }
    }
  }

// U - Update
async atualizarOpcao(id, id_pergunta, descricao, pontos) {
  const connection = await getConexao();
  const query = 'UPDATE pergunta_opcoes SET id_pergunta = ?, descricao = ?, pontos = ? WHERE id = ? AND deleted_at IS NULL';
  try {
    await connection.query(query, [id_pergunta, descricao, pontos, id]);
    await connection.release();
  } catch (erro) {
    console.error('Erro ao atualizar opção:', erro);
    throw erro;
  }
  finally {

    if(connection){
       connection.release(); 
    }
  }
}


  // D - Delete (Soft Delete - atualiza deleted_at)
  async deletarOpcao(id) {
    const connection = await getConexao();
    const query = 'UPDATE pergunta_opcoes SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?';
    try {
      await connection.query(query, [id]);
      await connection.release();
    } catch (erro) {
      console.error('Erro ao deletar opção:', erro);
      throw erro;
    }
    finally {

      if(connection){
         connection.release(); 
      }
    }
  }
  async ativarOpcao(id) {
    const connection = await getConexao();
    const query = 'UPDATE pergunta_opcoes SET deleted_at = NULL WHERE id = ?';
    try {
      await connection.query(query, [id]);
      await connection.release();
    } catch (erro) {
      console.error('Erro ao ativar opção:', erro);
      throw erro;
    }
    finally {

      if(connection){
         connection.release(); 
      }
    }
  }
}

  export default OpcoesRepositorio;