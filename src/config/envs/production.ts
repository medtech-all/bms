export const config = {
    db: {
        type: process.env.DB_TYPE || "mariadb",
        synchronize: false,
        logging: false,
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USERNAME || "noorabmsadmin",
        password: process.env.DB_PASSWORD || "mtsmts7676",
        database: process.env.DB_NAME || "noorabms",
        extra: {
            connectionLimit: 50,
        },
        autoLoadEntities: true
    }
}