import * as Yup from 'yup';

export class UsuariosValidacoes {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  // Validação para a criação de usuário
  async validarCriacaoUsuario(nome, email) {
    const schema = Yup.object().shape({
      nome: Yup.string()
        .required('Nome é obrigatório')
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras, espaços e acentos')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),
      email: Yup.string()
        .required('Email é obrigatório')
        .email('Email inválido')
        .max(100, 'Email deve ter no máximo 100 caracteres')
    });

    try {
      await schema.validate({ nome, email }, { abortEarly: false });
      return { nome, email };
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      return { errors };
    }
  }

  // Validação para atualização de usuário (nome e email são opcionais)
  validarAtualizacaoUsuario(dados) {
    const errors = {};
  
    if (dados.nome !== undefined) {
      if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(dados.nome)) {
        errors.nome = 'Nome deve conter apenas letras, espaços e acentos';
      } else if (dados.nome.length > 100) {
        errors.nome = 'Nome deve ter no máximo 100 caracteres';
      }
    }
  
    if (dados.email !== undefined) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
        errors.email = 'Email inválido';
      } else if (dados.email.length > 100) {
        errors.email = 'Email deve ter no máximo 100 caracteres';
      }
    }
  
    console.log("Resultado da validação:", errors);
    return { errors };
  }
}