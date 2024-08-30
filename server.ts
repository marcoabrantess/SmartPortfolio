import { app } from './src/server/app'

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Aplicação executando na porta ', port);
});