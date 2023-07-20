const { Pool } = require("pg");

// If you've set environment variables this is not needed
// const connectionString = 'postgresql://app:123456@localhost:5432/project_name'

const pool = new Pool({
  // If you've set environment variables this is not needed
  // connectionString,
});

(async () => {
  const client = await pool.connect();
  try {
    let res = await client.query("SELECT * FROM test");
    console.log(res.rows[0]);
    res = await client.query(
      "INSERT INTO test VALUES (default, $1, $2) RETURNING *", //or RETURNING id
      ["Hi", "Back"]
    );
    console.log(res.rows[0]);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
})().finally(() => pool.end());
