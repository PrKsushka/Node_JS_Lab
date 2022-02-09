import { createConnection } from 'typeorm';

const connectionToPostgresDataBase = () => {
  try {
    createConnection().then(() => {
      console.log('Postgres connection success');
    });
  } catch (err) {
    console.error('Postgres connection failed');
    process.exit(1);
  }
};
export default connectionToPostgresDataBase;
