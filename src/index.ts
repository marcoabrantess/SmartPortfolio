import { app } from './server/app'
import 'dotenv/config'; // Carrega as variáveis de ambiente do arquivo .env

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});