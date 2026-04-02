export const up = (pgm) => {
  pgm.createExtension("pgcrypto", { ifNotExists: true });
  pgm.createType("image_type", ["product", "model"]);

  pgm.createTable("product_images", {
    image_id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    product_id: {
      type: "uuid",
      notNull: true,
      references: "products(product_id)",
      onDelete: "cascade",
    },

    image_url: {
      type: "text",
      notNull: true,
    },

    image_type: {
      type: "image_type",
      notNull: true,
      default: "product",
    },

    created_at: {
      type: "timestamp",
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
  pgm.addConstraint(
    "product_images",
    "unique_image_type_per_product",
    "UNIQUE (product_id, image_type)",
  );
  pgm.createIndex("product_images", "product_id");
};

export const down = (pgm) => {
  pgm.dropTable("product_images");
  pgm.dropType("image_type");
};
