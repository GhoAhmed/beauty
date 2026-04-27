const pool = require("./db");

const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role VARCHAR(20) DEFAULT 'client' CHECK (role IN ('admin', 'client')),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log("✅ Tables created");
  process.exit();
};

initDb().catch((err) => {
  console.error("❌ Init error:", err.message);
  process.exit(1);
});
