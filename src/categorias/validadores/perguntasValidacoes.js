import * as Yup from 'yup';

export class PerguntasValidacoes {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  // Validação para a criação de pergunta
  async validarPergunta(descricao) {
    const schema = Yup.object().shape({
      descricao: Yup.string()
        .required('Descrição é obrigatória')
        .min(5, 'Descrição deve ter no mínimo 5 caracteres')
        .max(100, 'Descrição deve ter no máximo 100 caracteres')
    });

    try {
      await schema.validate({ descricao }, { abortEarly: false });
      return { descricao };
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      return { errors };
    }
  }
}

