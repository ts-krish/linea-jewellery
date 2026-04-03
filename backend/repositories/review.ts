import { pool } from "../config";
import type { ReviewInput } from "../types";

export const findAll = async (offset = 0, limit = 20) => {
  const result = await pool.query(
    `
    SELECT *
    FROM reviews
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
    FROM reviews
    WHERE review_id = $1;
  `,
    [id],
  );
  return result.rows[0] || null;
};

export const create = async (entity: ReviewInput) => {
  const result = await pool.query(
    `
    INSERT INTO reviews (
      product_id, user_name, rating, comment
    ) VALUES (
      $1, $2, $3, $4
    ) RETURNING *;
  `,
    [
      entity.product_id,
      entity.user_name,
      entity.rating,
      entity.comment
    ],
  );
  return result.rows[0];
};

export const update = async (id: string, entity: Partial<ReviewInput>) => {
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
    UPDATE reviews SET ${fields.join(", ")}
    WHERE review_id = $${idx}
    RETURNING *;
  `,
    values,
  );
  return result.rows[0] || null;
};

export const remove = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM reviews WHERE review_id = $1 RETURNING review_id;
  `,
    [id],
  );
  return result.rowCount ? result.rowCount > 0 : false;
};
