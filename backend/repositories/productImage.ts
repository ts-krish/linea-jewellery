import { pool } from "../config";
import type { ProductImageInput } from "../types";

export const findAll = async (offset = 0, limit = 20) => {
  const result = await pool.query(
    `
    SELECT *
    FROM product_images
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
    FROM product_images
    WHERE image_id = $1;
  `,
    [id],
  );
  return result.rows[0] || null;
};

export const create = async (entity: ProductImageInput) => {
  const result = await pool.query(
    `
    INSERT INTO product_images (
      product_id, image_url, image_type
    ) VALUES (
      $1, $2, $3
    ) RETURNING *;
  `,
    [
      entity.product_id,
      entity.image_url,
      entity.image_type
    ],
  );
  return result.rows[0];
};

export const update = async (id: string, entity: Partial<ProductImageInput>) => {
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
    UPDATE product_images SET ${fields.join(", ")}
    WHERE image_id = $${idx}
    RETURNING *;
  `,
    values,
  );
  return result.rows[0] || null;
};

export const remove = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM product_images WHERE image_id = $1 RETURNING image_id;
  `,
    [id],
  );
  return result.rowCount ? result.rowCount > 0 : false;
};
