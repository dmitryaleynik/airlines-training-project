-- types --
create type "order" as (
  order_id integer,
  status order_status,
  total integer,
  expires_at date
);

create type user_main_info as (
	user_id integer,
	email varchar(255),
	nickname varchar(255)
);

create type password_data as (
  password_hash text, 
  password_salt text
);

create type order_status as enum (
  'Cancelled', 
  'Confirmed', 
  'Pending'
);

-- tables --
create table orders (
	order_id serial primary key,
	user_id integer references users,
	status order_status not null,
	total integer not null,
	expires_at date
);

create table flights (
	flight_id serial primary key,
	city_from varchar(255) not null,
	city_to varchar(255) not null,
	date_from date not null,
	date_to date not null
);

create table users (
	user_id serial primary key,
	email varchar(255) not null,
	password_hash text not null,
	password_salt text not null,
	nickname varchar(255) not null,
	avatar bytea not null
);

-- functions --
create function get_orders_for_user(id integer)
returns table (order "order") as $$
begin
  return query select order_id, status, total, expires_at from orders where user_id=id;
end;
$$ language plpgsql;

create function insert_user(user_email varchar(255), user_hash text, user_salt text, user_avatar bytea)
returns void as $$
declare temp integer;
begin
  insert into users(email, password_hash, password_salt, avatar) 
    values(user_email, user_hash, user_salt, user_avatar);
  update users set nickname='User#' || user_id where email=user_email;
  return;
end;
$$ language plpgsql;

create function get_user_by_email(user_email character varying)
  returns user_main_info as $$
declare ret user_main_info;
begin
  select user_id, email, nickname, avatar into ret from users where user_email=email;
  return ret;
end;
$$ language plpgsql;

create function get_password_data(id integer)
  returns password_data as $$
declare ret password_data;
begin
  select password_hash, password_salt into ret from users where user_id=id;
  return ret;
end;
$$ language plpgsql;