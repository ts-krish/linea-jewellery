import { pool } from "../config";
import type { CartItemInput } from "../types";

export const findAll = async (offset = 0, limit = 20) => {
  const result = await pool.query(
    `
    SELECT *
    FROM cart_items
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
    FROM cart_items
    WHERE cart_item_id = $1;
  `,
    [id],
  );
  return result.rows[0] || null;
};

export const create = async (entity: CartItemInput) => {
  const result = await pool.query(
    `
    INSERT INTO cart_items (
      cart_id, product_id, unit_price, quantity
    ) VALUES (
      $1, $2, $3, $4
    ) RETURNING *;
  `,
    [
      entity.cart_id,
      entity.product_id,
      entity.unit_price,
      entity.quantity
    ],
  );
  return result.rows[0];
};

export const update = async (id: string, entity: Partial<CartItemInput>) => {
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
    UPDATE cart_items SET ${fields.join(", ")}
    WHERE cart_item_id = $${idx}
    RETURNING *;
  `,
    values,
  );
  return result.rows[0] || null;
};

export const remove = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM cart_items WHERE cart_item_id = $1 RETURNING cart_item_id;
  `,
    [id],
  );
  return result.rowCount ? result.rowCount > 0 : false;
};
