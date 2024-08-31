import 'dotenv/config'; // Carrega as variáveis de ambiente do arquivo .env
import { DataSource } from 'typeorm';

const {
  TYPEORM_CONNECTION,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_MIGRATIONS,
} = process.env;

if (!TYPEORM_CONNECTION || !TYPEORM_HOST || !TYPEORM_PORT || !TYPEORM_USERNAME || !TYPEORM_PASSWORD || !TYPEORM_DATABASE || !TYPEORM_MIGRATIONS) {
  throw new Error('Missing required environment variables.');
}

export const AppDataSource = new DataSource({
  type: TYPEORM_CONNECTION as 'postgres', // 'postgres'
  host: TYPEORM_HOST,
  port: parseInt(TYPEORM_PORT, 10),
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  entities: [__dirname + '/models/*.ts'], // Ajuste o caminho das entidades
  migrations: [TYPEORM_MIGRATIONS],
});
