let path = require("path");

require("sql-migrations").run({
    basedir: __dirname,
    migrationsDir: path.resolve(__dirname, "migrations"),
    user: "mail_users_db_user",
    host: "localhost",
    password: "mail.ru",
    db: "mail_users_db"
});