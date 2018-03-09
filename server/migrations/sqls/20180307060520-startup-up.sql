-- types --
create type "order" as
(
  order_id integer,
  leave_at date,
  status varchar(255),
  total integer
);

create type user_main_info as
(
  user_id integer,
  email character varying(255)
);

create type password_data as 
(
  password_hash text, 
  password_salt text
);

-- tables --
create table orders
(
  order_id serial primary key,
  leave_at date not null,
  status varchar(255) not null,
  total integer not null
);

create table users
(
  user_id serial primary key,
  email varchar(255) not null,
  password_hash text not null,
  password_salt text not null
);

-- functions --
create function get_all_orders()
returns table (o "order") as $$
begin
  return query
  select *
  from orders;
end;
$$ language plpgsql;

create function get_user_by_email(user_email varchar(255))
returns integer as $$
begin
  return (select user_id from users where user_email=email);
end;
$$ language plpgsql;

create function insert_user(user_email varchar(255), user_hash text, user_salt text)
returns coid as $$
begin
  insert into users(email, password_hash, password_salt) values(user_email, user_hash, user_salt);
end;
$$ language plpgsql;

create function get_user_by_email(user_email character varying)
  returns user_main_info as $$
declare ret user_main_info;
begin
  select user_id, email into ret from users where user_email=email;
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