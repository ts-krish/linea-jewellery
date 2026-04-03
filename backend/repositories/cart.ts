import { pool } from "../config";
import type { CartInput } from "../types";

export const findAll = async (offset = 0, limit = 20) => {
  const result = await pool.query(
    `
    SELECT *
    FROM carts
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
    FROM carts
    WHERE cart_id = $1;
  `,
    [id],
  );
  return result.rows[0] || null;
};

export const create = async (entity: CartInput) => {
  const result = await pool.query(
    `
    INSERT INTO carts (
      user_id, session_id
    ) VALUES (
      $1, $2
    ) RETURNING *;
  `,
    [
      entity.user_id,
      entity.session_id
    ],
  );
  return result.rows[0];
};

export const update = async (id: string, entity: Partial<CartInput>) => {
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
    UPDATE carts SET ${fields.join(", ")}
    WHERE cart_id = $${idx}
    RETURNING *;
  `,
    values,
  );
  return result.rows[0] || null;
};

export const remove = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM carts WHERE cart_id = $1 RETURNING cart_id;
  `,
    [id],
  );
  return result.rowCount ? result.rowCount > 0 : false;
};
