import { conexaoMySql, getConexao } from "../../banco-de-dados/conexaomysql.js";

// Inicializa a conexão MySQL
conexaoMySql();

class UsuariosRepositorio {
  // Usuários CRUD

  // C - Create
  async criarUsuario(nome, email) {
    const connection = await getConexao();
    
    const usuariosExistentes = await this.buscarTodosUsuarios();
    const usuarioEncontrado = usuariosExistentes.find(usuario => usuario.nome === nome && usuario.email === email);
  
    if (usuarioEncontrado) {
      const error = new Error(`Usuário já existente com o status: ${usuarioEncontrado.deleted_at ? 'INATIVO' : 'ATIVO'}`);
      error.code = 409; // Define o código de erro
      throw error; // Lança o erro
    }
  
    const query = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
    try {
      const [result] = await connection.query(query, [nome, email]);
      await connection.release();
      return result.insertId;
    } catch (erro) {
      console.error('Erro ao criar usuário:', erro);
      throw erro;
    }
  }
  

  // R - Read 1/4 - Por ID ALL
  async buscarUsuarioPorId(id) {
    const connection = await getConexao();
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    try {
      const [rows] = await connection.query(query, [id]);
      await connection.release();
      return rows; // Retorna o array completo
    } catch (erro) {
      console.error('Erro ao buscar usuário por ID:', erro);
      throw erro;
    }
    finally {

      if(connection){
         connection.release(); 
      }
    }
  }

    // R - Read 2/4 - Inativos
    async buscarUsuariosInativos() {
      const connection = await getConexao();
      const query = 'SELECT * FROM usuarios WHERE deleted_at IS NOT NULL';
      try {
        const [rows] = await connection.query(query);
        await connection.release();
        return rows; // Retorna o array completo
      } catch (erro) {
        console.error('Erro ao buscar os usuários inativos:', erro);
        throw erro;
      }
      finally {

        if(connection){
           connection.release(); 
        }
      }
    }

  // R - Read 3/4- Ativos
  async buscarUsuariosAtivos() {
    const connection = await getConexao();
    const query = 'SELECT * FROM usuarios WHERE deleted_at IS NULL';
    try {
      const [rows] = await connection.query(query);
      await connection.release();
      return rows;
    } catch (erro) {
      console.error('Erro ao buscar os usuários ativos:', erro);
      throw erro;
    }
    finally {

      if(connection){
         connection.release(); 
      }
    }
  }

  // R - Read 4/4- ALL
  async buscarTodosUsuarios() {
    const connection = await getConexao();
    const query = 'SELECT * FROM usuarios';
    try {
      const [rows] = await connection.query(query);
      await connection.release();
      return rows;
    } catch (erro) {
      console.error('Erro ao buscar todos os usuários:', erro);
      throw erro;
    }
    finally {

      if(connection){
         connection.release(); 
      }
    }
  }

// U - Update
async atualizarUsuario(id, usuario) {
  const connection = await getConexao();
  const query = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ? AND deleted_at IS NULL';
  try {
    console.log("Executando query de atualização com:", { id, nome: usuario.nome, email: usuario.email });
    const [result] = await connection.query(query, [usuario.nome, usuario.email, id]);
    console.log("Resultado da atualização:", result);
    await connection.release();
    return result;
  } catch (erro) {
    console.error('Erro ao atualizar usuário:', erro);
    throw erro;
  }
  finally {

    if(connection){
       connection.release(); 
    }
  }
}

  // D - Delete (Soft Delete - atualiza deleted_at)
  async deletarUsuario(id) {
    const connection = await getConexao();
    const query = 'UPDATE usuarios SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?';
    try {
      await connection.query(query, [id]);
      await connection.release();
    } catch (erro) {
      console.error('Erro ao deletar usuário:', erro);
      throw erro;
    }
    finally {

      if(connection){
         connection.release(); 
      }
    }
  }
}

export default UsuariosRepositorio;