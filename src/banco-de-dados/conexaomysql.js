// Importa a biblioteca mysql2 com promisses
import mysql from "mysql2/promise";

// Importa a função para criar tabelas
import { criarTabelas } from "./cria-tabelas.js";

// Importa a biblioteca dotenv para gerenciar variáveis de ambiente
import dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria um objeto para armazenar a conexão com o banco de dados
const conexao = {
  // Inicializa a conexão como nula
  pool: null,
};

/**
 * Função para conectar ao banco de dados
 */
async function conexaoMySql() {
  // Verifica se a conexão já existe
  if (!conexao.pool) {
    try {
      // Cria o pool de conexões com o banco de dados especificado
      conexao.pool = mysql.createPool({
        // Endereço do servidor do banco de dados
        host: process.env.DB_HOST,
        // Usuário para conexão com o banco de dados
        user: process.env.DB_USER,
        // Senha para conexão com o banco de dados
        password: process.env.DB_PASSWORD,
        // Nome do banco de dados a conectar
        database: process.env.DB_NAME,
      });

      // Cria o banco de dados se ele não existir
      const connection = await conexao.pool.getConnection();
      await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
      await connection.release();

      console.log("Conectado ao banco de dados");

      // Chama a função para criar as tabelas do banco de dados
      await criarTabelas(conexao.pool);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
      throw error;
    }
  }
}

/**
 * Função para obter uma conexão com o banco de dados
 * @returns {Promise<Connection>} Conexão com o banco de dados
 */
async function getConexao() {
  // Verifica se a conexão ainda não existe
  if (!conexao.pool) {
    // Se não existir, chama a função para conectar ao banco de dados
    await conectar();
  }

  // Retorna uma conexão disponível no pool
  return await conexao.pool.getConnection();
}

// Exporta as funções para conexão com o banco de dados
export { conexaoMySql, getConexao };



