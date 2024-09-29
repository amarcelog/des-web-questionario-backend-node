import mysql from "mysql2/promise"
import { criarTabelas } from "./cria-tabelas.js"
import dotenv from 'dotenv'

dotenv.config()

class ConexaoMySql {
  pool = null

  constructor() {}

  async conectar() {
    if (!this.pool) {
      try {
        // Cria o pool de conexões com o banco de dados especificado
        this.pool = mysql.createPool({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME // Adicione o banco de dados aqui
        })

        // Criamos o banco de dados se ele não existir
        const connection = await this.pool.getConnection()
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
        await connection.release()

        console.log("Conectado ao banco de dados")
        await criarTabelas(this.pool)
      } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error)
        throw error
      }
    }
  }

  async getConexao() {
    if (!this.pool) {
      await this.conectar();
    }
    return await this.pool.getConnection(); 
  }
}

export const conexaoMySql = new ConexaoMySql()


