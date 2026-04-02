export const up = (pgm) => {
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  pgm.createTable("users", {
    user_id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    user_name: {
      type: "varchar(150)",
      notNull: true,
    },

    email: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },

    password: {
      type: "text",
      notNull: true,
    },

    created_at: {
      type: "timestamp",
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable("users");
};