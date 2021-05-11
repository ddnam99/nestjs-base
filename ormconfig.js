module.exports = {
   "type": process.env.DB_TYPE,
   "host": process.env.DB_HOST,
   "port": process.env.DB_PORT,
   "username": process.env.DB_USER,
   "password": process.env.DB_PASS,
   "database": process.env.DB_NAME,
   "synchronize": false,
   "logging": false,
   "entities": ["dist/entities/*{.entity.ts,.entity.js,.ts,.js}"],
   "cli": {
      "entitiesDir": "src/entities"
   }
}