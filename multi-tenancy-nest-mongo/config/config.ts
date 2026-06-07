export default () => ({
    database : {
        connectionString: process.env.DB_CONNECTION_STRING,
    },
    security: {
        encryptionSecretKey: process.env.ENCRYPTION_KEY,
    }
})