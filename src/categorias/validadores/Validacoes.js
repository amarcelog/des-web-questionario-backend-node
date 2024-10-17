import * as Yup from 'yup';

export class Validacoes {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }
  
  // Validações para Respostas
  async validarResposta(idPergunta, idOpcao, idQuest) {
    const schema = Yup.object().shape({
      idPergunta: Yup.number().positive('ID da pergunta deve ser positivo').integer('ID da pergunta deve ser um número inteiro').required('ID da pergunta é obrigatório'),
      idOpcao: Yup.number().positive('ID da opção deve ser positivo').integer('ID da opção deve ser um número inteiro').required('ID da opção é obrigatório'),
      idQuest: Yup.number().positive('ID do questionário deve ser positivo').integer('ID do questionário deve ser um número inteiro').required('ID do questionário é obrigatório')
    });

    try {
      await schema.validate({ idPergunta, idOpcao, idQuest }, { abortEarly: false });

      const perguntaExiste = await this.repositorio.buscarPerguntaPorId(idPergunta);
      if (!perguntaExiste) {
        return ['O id_pergunta fornecido não existe na tabela perguntas.'];
      }

      const opcaoExiste = await this.repositorio.buscarOpcaoPorId(idOpcao);
      if (!opcaoExiste) {
        return ['O id_opcao fornecido não existe na tabela pergunta_opcoes.'];
      }

      const questExiste = await this.repositorio.buscarQuestRespondidaPorId(idQuest);
      if (!questExiste) {
        return ['O id_quest fornecido não existe na tabela quest_respondidas.'];
      }

      // Verifica se a opção pertence à pergunta
      if (opcaoExiste.id_pergunta !== idPergunta) {
        return ['A opção selecionada não pertence à pergunta especificada.'];
      }

      return [];
    } catch (error) {
      return error.errors;
    }
  }
}