import * as Yup from "yup";

export class OpcoesValidacoes {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  // Validação para a criação de opção
  async validarOpcao(id_pergunta, descricao, pontos) {
    const schema = Yup.object().shape({
      id_pergunta: Yup.number()
        .required("ID da pergunta é obrigatório")
        .integer("ID da pergunta deve ser um número inteiro")
        .positive("ID da pergunta deve ser um número positivo"),
      descricao: Yup.string()
        .required("Descrição é obrigatória")
        .min(3, "Descrição deve ter no mínimo 3 caracteres")
        .max(100, "Descrição deve ter no máximo 100 caracteres"),
      pontos: Yup.number()
        .required("Pontos são obrigatórios")
        .integer("Pontos devem ser um número inteiro")
        .min(0, "Pontos não podem ser negativos"),
    });

    try {
      await schema.validate({ id_pergunta, descricao, pontos }, { abortEarly: false });
      return {};
    } catch (error) {
      const errors = {};

      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });

      return errors;
    }
  }
}

