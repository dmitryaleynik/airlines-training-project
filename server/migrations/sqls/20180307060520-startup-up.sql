-- types --
CREATE TYPE "order" AS
(
  order_id INTEGER,
  leave_at DATE,
  status VARCHAR(255),
  total INTEGER
);

CREATE TYPE user_main_info AS
(
  user_id integer,
  email character varying(255)
);

-- tables --
CREATE TABLE orders
(
  order_id SERIAL PRIMARY KEY,
  leave_at DATE NOT NULL,
  status VARCHAR(255) NOT NULL,
  total INTEGER NOT NULL
);

CREATE TABLE users
(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL
);

-- functions --
CREATE FUNCTION get_all_orders()
RETURNS TABLE (o "order") AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM orders;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_user_by_email(user_email VARCHAR(255))
RETURNS INTEGER AS $$
BEGIN
  return (SELECT user_id FROM users WHERE user_email=email);
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION insert_user(user_email VARCHAR(255), user_hash TEXT, user_salt TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO users(email, password_hash, password_salt) VALUES(user_email, user_hash, user_salt);
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_user_by_email(user_email character varying)
  RETURNS user_main_info AS $$
declare ret user_main_info;
BEGIN
  SELECT user_id, email into ret FROM users WHERE user_email=email;
  return ret;
END;
$$ LANGUAGE plpgsql;