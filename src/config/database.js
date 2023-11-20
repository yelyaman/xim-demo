import 'dotenv/config';

export default {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  // logging: process.env.NODE_ENV === "dev",
  logging: false,
  define: {
    timestamps: true,
  },
  // timezone: "+06:00",
};
