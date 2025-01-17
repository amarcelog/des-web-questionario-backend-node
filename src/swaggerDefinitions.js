export const swaggerDefinitions = {
  components: {
    schemas: {
      Usuario: {
        type: "object",
        properties: {
          id: { type: "integer" },
          nome: { type: "string" },
          email: { type: "string" },
        },
      },
      Pergunta: {
        type: "object",
        properties: {
          id: { type: "integer" },
          descricao: { type: "string" },
        },
      },
      Opcao: {
        type: "object",
        properties: {
          id: { type: "integer" },
          descricao: { type: "string" },
          pontos: { type: "integer" },
          id_pergunta: { type: "integer" },
        },
      },
      QuestionarioRespondido: {
        type: "object",
        properties: {
          id: { type: "integer" },
          id_usuario: { type: "integer" },
          datahorainicio: { type: "string", format: "date-time" },
          datahorafim: { type: "string", format: "date-time" },
          pontuacao: { type: "integer" },
        },
      },
      Resposta: {
        type: "object",
        properties: {
          id: { type: "integer" },
          id_pergunta: { type: "integer" },
          id_opcao: { type: "integer" },
          id_quest: { type: "integer" },
        },
      },
    },
  },
  paths: {
    "/criarusuarios": {
      post: {
        tags: ["Usuários"],
        summary: "Cria um novo usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Usuario" },
            },
          },
        },
        responses: { 201: { description: "Usuário criado com sucesso" } },
      },
    },
    "/todosusuarios": {
      get: {
        tags: ["Usuários"],
        summary: "Busca todos os usuários",
        responses: {
          200: {
            description: "Lista de usuários retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Usuario" },
                },
              },
            },
          },
        },
      },
    },
    "/usuariosid/{id}": {
      get: {
        tags: ["Usuários"],
        summary: "Busca um usuário pelo ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Usuário encontrado com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Usuario" },
              },
            },
          },
        },
      },
    },
    "/usuariosinativos": {
      get: {
        tags: ["Usuários"],
        summary: "Busca usuários inativos",
        responses: {
          200: {
            description: "Lista de usuários inativos retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Usuario" },
                },
              },
            },
          },
        },
      },
    },
    "/usuariosativos": {
      get: {
        tags: ["Usuários"],
        summary: "Busca usuários ativos",
        responses: {
          200: {
            description: "Lista de usuários ativos retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Usuario" },
                },
              },
            },
          },
        },
      },
    },
    "/atualizarusuarios/{id}": {
      patch: {
        tags: ["Usuários"],
        summary: "Atualiza um usuário",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Usuario" },
            },
          },
        },
        responses: { 200: { description: "Usuário atualizado com sucesso" } },
      },
    },
    "/apagarusuarios/{id}": {
      delete: {
        tags: ["Usuários"],
        summary: "Deleta um usuário (softdelete)",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: { 200: { description: "Usuário deletado com sucesso" } },
      },
    },
    "/perguntas": {
      post: {
        tags: ["Perguntas"],
        summary: "Cria uma nova pergunta",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Pergunta" },
            },
          },
        },
        responses: { 201: { description: "Pergunta criada com sucesso" } },
      },
      get: {
        tags: ["Perguntas"],
        summary: "Busca todas as perguntas",
        responses: {
          200: {
            description: "Lista de perguntas retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Pergunta" },
                },
              },
            },
          },
        },
      },
    },
    "/perguntas/{id}": {
      get: {
        tags: ["Perguntas"],
        summary: "Busca uma pergunta pelo ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Pergunta encontrada com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Pergunta" },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Perguntas"],
        summary: "Atualiza uma pergunta",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Pergunta" },
            },
          },
        },
        responses: { 200: { description: "Pergunta atualizada com sucesso" } },
      },
      delete: {
        tags: ["Perguntas"],
        summary: "Deleta uma pergunta",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: { 200: { description: "Pergunta deletada com sucesso" } },
      },
    },
    "/opcoes": {
      post: {
        tags: ["Opções"],
        summary: "Cria uma nova opção",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Opcao" },
            },
          },
        },
        responses: { 201: { description: "Opção criada com sucesso" } },
      },
      get: {
        tags: ["Opções"],
        summary: "Busca todas as opções",
        responses: {
          200: {
            description: "Lista de opções retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Opcao" },
                },
              },
            },
          },
        },
      },
    },
    "/opcoes/{id}": {
      get: {
        tags: ["Opções"],
        summary: "Busca uma opção pelo ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Opção encontrada com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Opcao" },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Opções"],
        summary: "Atualiza uma opção",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Opcao" },
            },
          },
        },
        responses: { 200: { description: "Opção atualizada com sucesso" } },
      },
      delete: {
        tags: ["Opções"],
        summary: "Deleta uma opção",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: { 200: { description: "Opção deletada com sucesso" } },
      },
    },
    "/quest_respondidas": {
      post: {
        tags: ["Questionários Respondidos"],
        summary: "Cria um novo questionário respondido",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/QuestionarioRespondido" },
            },
          },
        },
        responses: {
          201: { description: "Questionário respondido criado com sucesso" },
        },
      },
      get: {
        tags: ["Questionários Respondidos"],
        summary: "Busca todos os questionários respondidos",
        responses: {
          200: {
            description:
              "Lista de questionários respondidos retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/QuestionarioRespondido",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/quest_respondidas/{id}": {
      get: {
        tags: ["Questionários Respondidos"],
        summary: "Busca um questionário respondido pelo ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Questionário respondido encontrado com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/QuestionarioRespondido" },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Questionários Respondidos"],
        summary: "Atualiza um questionário respondido",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/QuestionarioRespondido" },
            },
          },
        },
        responses: {
          200: {
            description: "Questionário respondido atualizado com sucesso",
          },
        },
      },
      delete: {
        tags: ["Questionários Respondidos"],
        summary: "Deleta um questionário respondido",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Questionário respondido deletado com sucesso" },
        },
      },
    },
    "/quest_respondidas/{id}/finalizar": {
      put: {
        tags: ["Questionários Respondidos"],
        summary: "Finaliza um questionário respondido",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Questionário respondido finalizado com sucesso",
          },
        },
      },
    },
    "/respostas": {
      post: {
        tags: ["Respostas"],
        summary: "Cria uma nova resposta",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Resposta" },
            },
          },
        },
        responses: { 201: { description: "Resposta criada com sucesso" } },
      },
      get: {
        tags: ["Respostas"],
        summary: "Busca todas as respostas",
        responses: {
          200: {
            description: "Lista de respostas retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Resposta" },
                },
              },
            },
          },
        },
      },
    },
    "/respostas/{id}": {
      get: {
        tags: ["Respostas"],
        summary: "Busca uma resposta pelo ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Resposta encontrada com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Resposta" },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Respostas"],
        summary: "Atualiza uma resposta",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Resposta" },
            },
          },
        },
        responses: { 200: { description: "Resposta atualizada com sucesso" } },
      },
      delete: {
        tags: ["Respostas"],
        summary: "Deleta uma resposta",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: { 200: { description: "Resposta deletada com sucesso" } },
      },
    },
  },
};
