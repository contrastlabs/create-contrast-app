-- Up Migration

CREATE TABLE users (
  id TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ(3)
);

ALTER TABLE users ADD CONSTRAINT users_id_pk PRIMARY KEY (id);

-- Down Migration

DROP TABLE users;