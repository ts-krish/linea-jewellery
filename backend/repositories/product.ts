import { pool } from "../config";
import type { ProductInput } from "../types";

export const findAll = async (offset = 0, limit = 20) => {
  const result = await pool.query(
    `
    SELECT p.*,
      COALESCE(
        json_agg(
          json_build_object(
            'image_id', pi.image_id,
            'image_url', pi.image_url,
            'image_type', pi.image_type
          )
        ) FILTER (WHERE pi.image_id IS NOT NULL),
        '[]'
      ) as images
    FROM products p
    LEFT JOIN product_images pi ON p.product_id = pi.product_id
    GROUP BY p.product_id
    ORDER BY p.created_at DESC
    LIMIT $1 OFFSET $2;
  `,
    [limit, offset],
  );
  return result.rows;
};

export const findById = async (id: string) => {
  const result = await pool.query(
    `
    SELECT p.*,
      COALESCE(
        json_agg(
          json_build_object(
            'image_id', pi.image_id,
            'image_url', pi.image_url,
            'image_type', pi.image_type
          )
        ) FILTER (WHERE pi.image_id IS NOT NULL),
        '[]'
      ) as images
    FROM products p
    LEFT JOIN product_images pi ON p.product_id = pi.product_id
    WHERE p.product_id = $1
    GROUP BY p.product_id;
  `,
    [id],
  );
  return result.rows[0] || null;
};

export const create = async (product: ProductInput) => {
  const result = await pool.query(
    `
    INSERT INTO products (
      category, brand_name, material, length, height, weight, price, 
      editor_note, description, product_details, care_instructions, stock
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
    ) RETURNING *;
  `,
    [
      product.category,
      product.brand_name,
      product.material,
      product.length,
      product.height,
      product.weight,
      product.price,
      product.editor_note,
      product.description,
      product.product_details,
      product.care_instructions,
      product.stock,
    ],
  );
  return result.rows[0];
};

export const update = async (id: string, product: Partial<ProductInput>) => {
  const fields = [];
  const values = [];
  let idx = 1;
  for (const [key, value] of Object.entries(product)) {
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
    UPDATE products SET ${fields.join(", ")}
    WHERE product_id = $${idx}
    RETURNING *;
  `,
    values,
  );
  return result.rows[0] || null;
};

export const remove = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM products WHERE product_id = $1 RETURNING product_id;
  `,
    [id],
  );
  return result.rowCount ? result.rowCount > 0 : false;
};
