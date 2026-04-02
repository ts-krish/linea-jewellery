export const up = (pgm) => {
  pgm.createTable("cart_items", {
    cart_item_id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    cart_id: {
      type: "uuid",
      notNull: true,
      references: "carts(cart_id)",
      onDelete: "cascade",
    },

    product_id: {
      type: "uuid",
      notNull: true,
      references: "products(product_id)",
      onDelete: "cascade",
    },

    unit_price: {
      type: "numeric(10,2)",
      notNull: true,
      check: "unit_price >= 0",
    },

    quantity: {
      type: "int",
      notNull: true,
      check: "quantity > 0",
    },
  });

  pgm.addConstraint(
    "cart_items",
    "unique_product_per_cart",
    "UNIQUE (cart_id, product_id)"
  );

  pgm.createIndex("cart_items", "cart_id");
};

export const down = (pgm) => {
  pgm.dropTable("cart_items");
};