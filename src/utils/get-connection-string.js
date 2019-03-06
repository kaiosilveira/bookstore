const getConnectionString = () => process.env.NODE_ENV === 'dev' 
    ? `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    : 'mongodb://localhost:27017/bookstoretests';

module.exports = getConnectionString;