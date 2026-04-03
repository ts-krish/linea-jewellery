import { pool } from "../config";
import type { UserInput } from "../types";

export const findAll = async (offset = 0, limit = 20) => {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2;
  `,
    [limit, offset],
  );
  return result.rows;
};

export const findById = async (id: string) => {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE user_id = $1;
  `,
    [id],
  );
  return result.rows[0] || null;
};

export const create = async (entity: UserInput) => {
  const result = await pool.query(
    `
    INSERT INTO users (
      user_name, email, password
    ) VALUES (
      $1, $2, $3
    ) RETURNING *;
  `,
    [
      entity.user_name,
      entity.email,
      entity.password
    ],
  );
  return result.rows[0];
};

export const update = async (id: string, entity: Partial<UserInput>) => {
  const fields = [];
  const values = [];
  let idx = 1;
  for (const [key, value] of Object.entries(entity)) {
    if (value !== undefined) {
      fields.push(`${key} = $${idx}`);
      values.push(value);
      idx++;
    }
  }

  if (fields.length === 0) return null;

  values.push(id);
  const result = await pool.query(
    `
    UPDATE users SET ${fields.join(", ")}
    WHERE user_id = $${idx}
    RETURNING *;
  `,
    values,
  );
  return result.rows[0] || null;
};

export const remove = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM users WHERE user_id = $1 RETURNING user_id;
  `,
    [id],
  );
  return result.rowCount ? result.rowCount > 0 : false;
};
