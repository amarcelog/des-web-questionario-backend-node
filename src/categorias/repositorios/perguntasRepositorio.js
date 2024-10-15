import { conexaoMySql, getConexao } from "../../banco-de-dados/conexaomysql.js";

// Inicializa a conexão MySQL
conexaoMySql();

class PerguntasRepositorio {

  // Perguntas CRUD

  // C - Create
  async criarPergunta(descricao) {
    const connection = await getConexao();
    const query = 'INSERT INTO perguntas (descricao) VALUES (?)';
    try {
      const [result] = await connection.query(query, [descricao]);
      await connection.release();
      return result.insertId;
    } catch (erro) {
      console.error('Erro ao criar pergunta:', erro);
      throw erro;
    }
    finally {

        if(connection){
           connection.release(); 
        }
      }
  }

  // R - Read
  async buscarPerguntaPorId(id) {
    const connection = await getConexao();
    const query = 'SELECT * FROM perguntas WHERE id = ?'; // Corrigido: adicionada a condição WHERE
    try {
      const [rows] = await connection.query(query, [id]);
      return rows[0];
      
   } catch (erro) {
  
     console.error('Erro ao buscar pergunta por ID:', erro);
     
     throw erro;
  
   } finally {
  
       if(connection){
          connection.release(); 
       }
    
   }
  }
  

  // R - Read - ALL
  async buscarTodasPerguntas() {
    const connection = await getConexao();
    const query = 'SELECT * FROM perguntas';
    try {
      const [rows] = await connection.query(query);
      await connection.release();
      return rows;
    } catch (erro) {
      console.error('Erro ao buscar todas as perguntas:', erro);
      throw erro;
    }
    finally {

        if(connection){
           connection.release(); 
        }
      }
  }

// U - Update
async atualizarPergunta(id, descricao) {
  const connection = await getConexao();
  const query = 'UPDATE perguntas SET descricao = ? WHERE id = ?'; 
  try {
    await connection.query(query, [descricao, id]);
    return; // Não é necessário retornar nada específico

 } catch (erro) {

   console.error('Erro ao atualizar pergunta:', erro);
   
   throw erro;

 } finally {

     if(connection){
        connection.release(); 
     }
  
 }
}

  // D - Delete (Soft Delete - atualiza deleted_at)
  async deletarPergunta(id) {
    const connection = await getConexao();
    const query = 'UPDATE perguntas SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?';
    try {
      await connection.query(query, [id]);
      await connection.release();
    } catch (erro) {
      console.error('Erro ao deletar pergunta:', erro);
      throw erro;
    }
    finally {

        if(connection){
           connection.release(); 
        }
      }
  }
}
  export default PerguntasRepositorio;