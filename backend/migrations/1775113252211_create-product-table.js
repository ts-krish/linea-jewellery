export const up = (pgm) => {
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  pgm.createType("product_category", [
    "rings",
    "necklaces",
    "earrings",
    "bracelets",
    "watches",
  ]);

  pgm.createTable("products", {
    product_id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    category: {
      type: "product_category",
      notNull: true,
    },

    brand_name: {
      type: "varchar(150)",
      notNull: true,
    },

    material: {
      type: "varchar(100)",
    },

    length: {
      type: "numeric(10,2)",
      notNull: true,
      check: "length >= 0",
    },

    height: {
      type: "numeric(10,2)",
      notNull: true,
      check: "height >= 0",
    },

    weight: {
      type: "numeric(10,2)",
      notNull: true,
      check: "weight >= 0",
    },

    price: {
      type: "numeric(10,2)",
      notNull: true,
      check: "price >= 0",
    },

    editor_note: {
      type: "text",
    },

    description: {
      type: "text",
    },

    product_details: {
      type: "jsonb",
    },

    care_instructions: {
      type: "text[]",
    },

    stock: {
      type: "int",
      notNull: true,
      check: "stock >= 0",
    },

    created_at: {
      type: "timestamp",
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable("products");
  pgm.dropType("product_category");
};
