export const config = {
    db: {
        type: process.env.DB_TYPE || "mariadb",
        synchronize: true,
        logging: true,
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USERNAME || "noorabms",
        password: process.env.DB_PASSWORD || "mtsmts7676",
        database: process.env.DB_NAME || "noorabms",
        entities: [],
        extra: {
            connectionLimit: 10,
        },
        autoLoadEntities: true
    },
}