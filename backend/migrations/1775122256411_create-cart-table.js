export const up = (pgm) => {
  pgm.createTable("carts", {
    cart_id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    user_id: {
      type: "uuid",
      references: "users(user_id)",
      onDelete: "cascade",
    },

    session_id: {
      type: "uuid",
    },

    created_at: {
      type: "timestamp",
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.createIndex("carts", "user_id", {
    unique: true,
    where: "user_id IS NOT NULL",
  });

  pgm.createIndex("carts", "session_id", {
    unique: true,
    where: "session_id IS NOT NULL",
  });
};

export const down = (pgm) => {
  pgm.dropTable("carts");
};