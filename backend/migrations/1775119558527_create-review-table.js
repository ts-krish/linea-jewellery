export const up = (pgm) => {
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  pgm.createTable("reviews", {
    review_id: {
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

    user_name: {
      type: "varchar(150)",
      notNull: true,
    },

    rating: {
      type: "int",
      notNull: true,
      check: "rating >= 1 AND rating <= 5",
    },

    comment: {
      type: "text",
    },

    created_at: {
      type: "timestamp",
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.createIndex("reviews", "product_id");
};

export const down = (pgm) => {
  pgm.dropTable("reviews");
};