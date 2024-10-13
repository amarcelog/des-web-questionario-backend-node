import { conexaoMySql, getConexao } from "../../banco-de-dados/conexaomysql.js";

// Inicializa a conexão MySQL
conexaoMySql();

class Repositorio {
  // Usuários CRUD

  // C - Create
  async criarUsuario(nome, email) {
    const connection = await getConexao();
    const query = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)'; // Corrigido
    try {
      const [result] = await connection.query(query, [nome, email]); // Passando os valores corretamente
      await connection.release();
      return result.insertId;
    } catch (erro) {
      console.error('Erro ao criar usuário:', erro);
      throw erro;
    }
  }

  // R - Read
  async buscarUsuarioPorId(id) {
    const connection = await getConexao();
    const query = 'SELECT * FROM usuarios WHERE id = ? AND deleted_at IS NULL';
    try {
      const [rows] = await connection.query(query, [id]);
      await connection.release();
      return rows; // Retorna o array completo
    } catch (erro) {
      console.error('Erro ao buscar usuário por ID:', erro);
      throw erro;
    }
  }

  // R - Read - ALL
  async buscarTodosUsuarios() {
    const connection = await getConexao();
    const query = 'SELECT * FROM usuarios WHERE deleted_at IS NULL';
    try {
      const [rows] = await connection.query(query);
      await connection.release();
      return rows;
    } catch (erro) {
      console.error('Erro ao buscar todos os usuários:', erro);
      throw erro;
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
  }

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
  }

  // R - Read
  async buscarPerguntaPorId(id) {
    const connection = await getConexao();
    const query = 'SELECT * FROM perguntas WHERE id = ? AND deleted_at IS NULL';
    try {
      const [rows] = await connection.query(query, [id]);
      await connection.release();
      return rows[0];
    } catch (erro) {
      console.error('Erro ao buscar pergunta por ID:', erro);
      throw erro;
    }
  }

  // R - Read - ALL
  async buscarTodasPerguntas() {
    const connection = await getConexao();
    const query = 'SELECT * FROM perguntas WHERE deleted_at IS NULL';
    try {
      const [rows] = await connection.query(query);
      await connection.release();
      return rows;
    } catch (erro) {
      console.error('Erro ao buscar todas as perguntas:', erro);
      throw erro;
    }
  }

  // U - Update
  async atualizarPergunta(id, descricao) {
    const connection = await getConexao();
    const query = 'UPDATE perguntas SET descricao = ? WHERE id = ? AND deleted_at IS NULL';
    try {
      await connection.query(query, [descricao, id]);
      await connection.release();
    } catch (erro) {
      console.error('Erro ao atualizar pergunta:', erro);
      throw erro;
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
  }

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
  }

  // R - Read
  async buscarOpcaoPorId(id) {
    const connection = await getConexao();
    const query = 'SELECT * FROM pergunta_opcoes WHERE id = ? AND deleted_at IS NULL';
    try {
      const [rows] = await connection.query(query, [id]);
      await connection.release();
      return rows[0];
    } catch (erro) {
      console.error('Erro ao buscar opção por ID:', erro);
      throw erro;
    }
  }

  // R - Read - ALL
  async buscarTodasOpcoes() {
    const connection = await getConexao();
    const query = 'SELECT * FROM pergunta_opcoes WHERE deleted_at IS NULL';
    try {
      const [rows] = await connection.query(query);
      await connection.release();
      return rows;
    } catch (erro) {
      console.error('Erro ao buscar todas as opções:', erro);
      throw erro;
    }
  }

  // U - Update
  async atualizarOpcao(id, opcao) {
    const connection = await getConexao();
    const query = 'UPDATE pergunta_opcoes SET descricao = ?, pontos = ? WHERE id = ? AND deleted_at IS NULL';
    try {
      await connection.query(query, [opcao.descricao, opcao.pontos, id]);
      await connection.release();
    } catch (erro) {
      console.error('Erro ao atualizar opção:', erro);
      throw erro;
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
  }

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