import app from './app';
import * as dotenv from 'dotenv';
import { AppDataSource } from './database/data-source';
import 'reflect-metadata';
dotenv.config();
const PORT = process.env.PORT || 3005;

AppDataSource.initialize()
  .then(async () => {
    console.log(`✨ Database Connection Established ✅`);
  })
  .catch((err) => console.error(err));
app.listen(PORT, () => {
  console.log(`✨ Server is running on port ${PORT}`);
});
