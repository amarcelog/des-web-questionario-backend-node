import OpcoesRepositorio from '../repositorios/opcoesRepositorio.js';
import { OpcoesValidacoes } from '../validadores/opcoesValidacoes.js';

class OpcoesController {
  constructor() {
    this.repositorio = new OpcoesRepositorio();
    this.validacoes = new OpcoesValidacoes(this.repositorio);
    console.log('Repositorio criado:', this.repositorio);
  }
  // Métodos para opções
  criarOpcao = async (req, res) => {
    try {
      const { id_pergunta, descricao, pontos } = req.body;
  
      // Validação inicial
      const erros = await this.validacoes.validarOpcao(id_pergunta, descricao, pontos);
      if (Object.keys(erros).length > 0) {
        return res.status(400).json({ erros });
      }
  
      // Verificar se já existe uma opção com a mesma descrição para a mesma pergunta
      const todasOpcoes = await this.repositorio.buscarTodasOpcoes(true); // true para incluir opções deletadas
      const opcaoExistente = todasOpcoes.find(opcao => 
        opcao.id_pergunta === id_pergunta && 
        opcao.descricao.toLowerCase() === descricao.toLowerCase()
      );
  
      if (opcaoExistente) {
        if (opcaoExistente.deleted_at !== null) {
          // Se existe, mas está deletada, reativar
          await this.repositorio.ativarOpcao(opcaoExistente.id);
          return res.status(200).json({ id: opcaoExistente.id, mensagem: 'Opção reativada com sucesso' });
        } else {
          return res.status(400).json({ erro: 'Já existe uma opção ativa com esta descrição para esta pergunta' });
        }
      }
  
      // Se chegou até aqui, podemos criar a nova opção
      const id = await this.repositorio.criarOpcao(id_pergunta, descricao, pontos);
      res.status(201).json({ id, mensagem: 'Opção criada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar opção' });
    }
  };
  
  

  buscarOpcaoPorId = async (req, res) => {
    try {
      const opcao = await this.repositorio.buscarOpcaoPorId(req.params.id);
      if (!opcao) {
        res.status(404).json({ erro: 'Opção não encontrada' });
      } else {
        res.json(opcao);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar opção' });
    }
  };

  buscarTodasOpcoes = async (req, res) => {
    try {
      const opcoes = await this.repositorio.buscarTodasOpcoes();
      res.json(opcoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar todas as opções' });
    }
  };
  
  atualizarOpcao = async (req, res) => {
    try {
      const { id } = req.params;
      const { id_pergunta, descricao, pontos } = req.body;
  
      // Validação inicial
      const erros = await this.validacoes.validarOpcao(id_pergunta, descricao, pontos);
      if (Object.keys(erros).length > 0) {
        return res.status(400).json({ erros });
      }
  
      // Buscar a opção atual no banco de dados
      const opcaoAtual = await this.repositorio.buscarOpcaoPorId(id);
      if (!opcaoAtual) {
        return res.status(404).json({ erro: 'Opção não encontrada' });
      }
  
      // Verificar se já existe uma opção com a mesma descrição para a mesma pergunta
      const todasOpcoes = await this.repositorio.buscarTodasOpcoes(true); // true para incluir opções deletadas
      const opcaoExistente = todasOpcoes.find(opcao => 
        opcao.id !== parseInt(id) && // Não é a mesma opção que estamos editando
        opcao.id_pergunta === id_pergunta && 
        opcao.descricao.toLowerCase() === descricao.toLowerCase()
      );
  
      if (opcaoExistente) {
        if (opcaoExistente.deleted_at !== null) {
          // Se existe, mas está deletada, reativar
          await this.repositorio.ativarOpcao(opcaoExistente.id);
          return res.status(200).json({ id: opcaoExistente.id, mensagem: 'Opção existente reativada e esta mantida' });
        } else {
          return res.status(400).json({ erro: 'Já existe uma opção ativa com esta descrição para esta pergunta' });
        }
      }
  
      // Se chegou até aqui, podemos atualizar a opção
      await this.repositorio.atualizarOpcao(id, id_pergunta, descricao, pontos);
      res.status(200).json({ mensagem: 'Opção atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao atualizar opção' });
    }
  };
  

  deletarOpcao = async (req, res) => {
    try {
      await this.repositorio.deletarOpcao(req.params.id);
      res.status(200).json({ mensagem: 'Opção deletada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao deletar opção' });
    }
  };
}

export default new OpcoesController();
