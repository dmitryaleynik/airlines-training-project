set time zone 'UTC';

-- types --
create type order_status as enum (
  'Cancelled', 
  'Confirmed', 
  'Pending'
);

create type roles as enum (
  'user', 
  'admin'
);

create type "order" as (
  order_id integer,
  order_number integer,
  status order_status,
  expires_at timestamp
);

create type order_with_date_from as (
  order_id integer,
  order_number integer,
  status order_status,
  expires_at timestamp,
  date_from timestamp[]
);

create type place as (
  place_id integer,
  place_number varchar(255),
  type_name varchar(255),
  price integer
);

create type place_with_availability as (
  place_id integer,
  place_number varchar(255),
  type_name varchar(255),
  price integer,
  availability boolean
);

create type flight_brief as (
  flight_id integer,
  city_from varchar(255),
  city_to varchar(255),
  date_from timestamp,
  date_to timestamp,
  plane_id integer,
  plane_type varchar(255),
  free_kg integer,
  max_kg integer,
  price_for_kg integer
);

create type flight_expanded as (
  flight_id integer,
  city_from varchar(255),
  city_to varchar(255),
  date_from timestamp,
  date_to timestamp,
  plane_id integer,
  plane_type varchar(255),
  luggage_kg integer,
  max_kg integer,
  free_kg integer,
  price_for_kg integer
);

create type flight_admin as (
 flight_id integer,
 city_from varchar(255),
 city_to varchar(255),
 date_from timestamp,
 date_to timestamp,
 plane_id integer,
 free_kg integer,
 price_for_kg integer
);

create type user_main_info as (
  user_id integer,
  email varchar(255),
  nickname varchar(255),
  role roles
);

create type user_with_avatar as (
  user_id integer,
  email varchar(255),
  nickname varchar(255),
  avatar bytea,
  avatar_type varchar(255),
  role roles
);

create type password_data as (
  password_hash text, 
  password_salt text
);

create type plane as (
  plane_id integer,
  plane_type varchar(255),
  max_kg integer
);

create type plane_with_rows as (
  plane_id integer,
  plane_type varchar(255),
  max_kg integer,
  rows integer,
  columns integer
);

-- tables --
create table users (
  user_id serial primary key,
  email varchar(255) not null,
  password_hash text not null,
  password_salt text not null,
  nickname varchar(255),
  avatar bytea not null,
  avatar_type varchar(255) not null,
  role roles not null
);

create table planes (
  plane_id serial primary key,
  type varchar(255) not null,
  places_rows integer not null,
  places_columns integer not null
);

create table place_types (
  type_id serial primary key,
  plane_id integer references planes not null,
  type_name varchar(255) not null
);

create table places (
  place_id serial primary key,
  type_id integer references place_types not null,
  plane_id integer references planes not null,
  place_number varchar(255) not null
);

create table orders (
  order_id serial primary key,
  user_id integer references users not null,
  order_number integer not null,
  status order_status not null,
  expires_at timestamp
);

create table flights (
  flight_id serial primary key,
  city_from varchar(255) not null,
  city_to varchar(255) not null,
  date_from timestamp not null,
  date_to timestamp not null,
  plane_id integer references planes not null
);

create table type_prices (
  type_id integer references place_types not null,
  flight_id integer references flights not null,
  price integer
);

create table ordered_flights (
  flight_id integer references flights not null,
  order_id integer references orders not null,
  luggage_kg integer
);

create table ordered_places (
  flight_id integer references flights not null,
  place_id integer references places not null,
  order_id integer references orders not null
);

create table luggage_schemas (
  luggage_schema_id serial primary key,
  plane_id integer references planes not null,
  max_kg integer not null,
  free_kg integer not null,
  price_for_kg integer not null
);

create table luggage_prices (
  flight_id integer references flights not null,
  free_kg integer not null,
  price_for_kg integer not null
);

-- functions --
create function get_orders_by_user_id(id integer)
  returns table (ord order_with_date_from) as $$
begin
  return query
    select
      o.order_id,
      o.order_number,
      o.status,
      o.expires_at,
      array_agg(f.date_from) 
    from orders o	
      natural join ordered_flights
      natural join flights f 
    where o.user_id = id 
    group by order_id;
end;
$$ language plpgsql;

create function get_order_by_id(uid integer, oid integer)
  returns "order" as $$
declare ret "order";
begin
  select
    order_id,
    order_number,
    status,
    expires_at
  into ret
  from orders
  where oid = order_id
    and uid = user_id;

  return ret;
end;
$$ language plpgsql;

create function get_ordered_flights(ord_id integer)
  returns table (flgt flight_expanded) as $$
begin
  return query 
    select
      f.*,
      p.type as plane_type,
      of.luggage_kg, 
      lsc.max_kg,
      lp.free_kg,
      lp.price_for_kg
    from ordered_flights of
      natural join flights f
      natural join planes p
      natural join luggage_schemas lsc
      natural join luggage_prices lp
    where of.order_id = ord_id;
end;
$$ language plpgsql;

create function get_ordered_places(fl_id integer, ord_id integer)
  returns table (plc place) as $$
begin
  return query
    select
      p.place_id,
      p.place_number,
      pt.type_name,
      tpr.price 
    from ordered_places
      natural join places p
      natural join place_types pt
      natural join type_prices tpr
    where flight_id = fl_id
      and order_id = ord_id;
end;
$$ language plpgsql;

create function insert_user
  (user_email varchar(255),
  user_hash text,
  user_salt text,
  user_avatar bytea,
  user_avtype varchar(255))
  returns void as $$
declare temp integer;
begin
  insert into users(email, password_hash, password_salt, avatar, avatar_type, role) 
    values(user_email, user_hash, user_salt, user_avatar, user_avtype, 'user');

  update users
    set nickname = 'User#' || user_id
    where email = user_email;
  
  return;
end;
$$ language plpgsql;

create function get_user_by_email(user_email varchar(255))
  returns user_main_info as $$
declare ret user_main_info;
begin
  select
    user_id,
    email,
    nickname,
    role
  into ret
  from users
  where user_email = email;

  return ret;
end;
$$ language plpgsql;

create function get_password_data(id integer)
  returns password_data as $$
declare ret password_data;
begin
  select
    password_hash,
    password_salt
  into ret
  from users
  where user_id = id;

  return ret;
end;
$$ language plpgsql;

create function get_all_cities()
  returns table(city varchar(255)) as $$
begin
  return query
    select distinct city_from as city
    from
      (select city_from
      from flights
      union all
      select city_to
      from flights)
    as t1;
end;
$$ language plpgsql;

create function get_available_places_ids(fl_id integer)
  returns table (place_id integer) as $$
declare pl_id integer;
begin
  select plane_id
  into pl_id
  from flights
  where flight_id = fl_id;

  return query
    select places.place_id
    from places 
    where plane_id = pl_id
      and places.place_id not in 
        (select ordered_places.place_id
        from ordered_places
          natural join orders 
        where flight_id = fl_id
          and (status = 'Confirmed'
            or expires_at > current_timestamp)
        );
end;
$$ language plpgsql;

create function get_flights_by_filters
  (c_from varchar(255),
  c_to varchar(255),
  d_from timestamp,
  d_to timestamp,
  seats integer)
  returns table (fs flight_brief) as $$
begin
  return query
    select
      f.*,
      type as plane_type,
      free_kg,
      max_kg,
      price_for_kg
    from flights f
      natural join planes
      natural join luggage_schemas
      natural join luggage_prices
    where f.city_from = c_from
      and f.city_to = c_to
      and f.date_from >= d_from
      and f.date_to <= d_to
      and	seats <=
        (select count(*)
        from get_available_places_ids(f.flight_id)
        );
end;
$$ language plpgsql;

create function get_places_with_availability(fl_id integer)
  returns table(pwa place_with_availability) as $$
begin
  return query
    select
      place_id,
      place_number,
      cast(max(type_name) as varchar(255)) as type_name,
      max(price) as price,
      case 
        when max(status) = 'Confirmed' then false 
        when max(expires_at) > current_timestamp then false
        else true
      end as is_available
    from flights
      natural join planes
      natural join places
      natural join place_types
      join type_prices
        using(flight_id, type_id)
      left join ordered_places
        using(flight_id, place_id)
      left join orders using(order_id)
    where flights.flight_id = fl_id
    group by place_id
    order by 
      replace
        (translate
          (place_number,
          '0123456789',
          '##########'),
        '#',
        ''),
      cast
        (replace
          (place_number,
          replace
            (translate
              (place_number,
              '0123456789',
              '##########'),
            '#',
            ''),
          '')
        as integer);
end;
$$ language plpgsql;

create function get_plane_sizes(fl_id integer)
  returns table(rows integer, columns integer) as $$
begin
  return query
    select
      places_rows as rows,
      places_columns as columns
    from flights
      natural join planes
    where flight_id = fl_id;
end;
$$ language plpgsql;

create function count_places_by_type(fl_id integer)
  returns table(amount bigint, type_name varchar(255), price integer) as $$
begin
  return query
    select
      count(place_id) as amount,
      pt.type_name,
      tpr.price 
    from get_available_places_ids(fl_id)
      natural join places
      natural join place_types pt
      natural join type_prices tpr
    where flight_id = fl_id
    group by
      pt.type_name,
      tpr.price;
end;
$$ language plpgsql;

create or replace function create_order(fid integer, uid integer, exp timestamp)
  returns integer as $$
declare onum integer;
declare oid integer;
begin
  select count(*)
  into onum
  from orders
  where user_id = uid;
  
  insert into orders(user_id, status, expires_at, order_number)
  values(uid, 'Pending', exp, onum+1)
  returning order_id
    into oid;

  return oid;
end;
$$ language plpgsql;

create function link_flight_with_order(fid integer, oid integer, lug integer)
  returns void as $$
begin
  insert into ordered_flights
  values(fid, oid, lug);

  return;
end;
$$ language plpgsql;

create function link_flight_with_order(fid integer, oid integer)
  returns void as $$
begin
  insert into ordered_flights(flight_id, order_id)
  values(fid, oid);

  return;
end;
$$ language plpgsql;

create function link_place_with_order(plsid integer, fid integer, oid integer)
  returns void as $$
begin
  insert into ordered_places
  values(plsid, fid, oid);

  return;
end;
$$ language plpgsql;

create function check_flight_linkage(fid integer, oid integer)
  returns integer as $$
declare ret integer;
begin
  select flight_id
    into ret
  from ordered_flights
  where flight_id = fid
    and order_id = oid;
  
  return ret;
end;
$$ language plpgsql;

create or replace function confirm_order(oid integer)
  returns void as $$
begin
  update orders
  set 
    status = 'Cancelled',
    expires_at = null
  where order_id = oid;

  return;
end;
$$ language plpgsql;

create function cancel_order(oid integer)
  returns void as $$
begin
  update orders
  set 
    status = 'Cancelled',
    expires_at = null
  where order_id = oid;


  return;
end;
$$ language plpgsql;

create or replace function update_orders_statuses(fids integer[]) 
  returns void as $$
begin
  update orders
  set 
    status = 'Cancelled',
    expires_at = null
  where order_id in
    (select order_id
    from orders
      natural join ordered_flights
    where array_position(fids, flight_id) is not null
      and expires_at < current_timestamp
    );

  return;
end;
$$ language plpgsql;

create function change_nickname(uid integer, nick varchar(255))
  returns void as $$
begin
  update users
  set nickname = nick
  where user_id = uid;

  return;
 end;
 $$ language plpgsql;

create function get_user_with_avatar_by_id(uid integer)
  returns user_with_avatar as $$
declare ret user_with_avatar;
begin
  select 
    user_id,
    email,
    nickname,
    avatar,
    avatar_type,
    role
  into ret
  from users
  where user_id = uid;

  return ret;
end;
$$ language plpgsql;

create function change_avatar(uid integer, av bytea, av_type varchar(255))
returns void as $$
begin
  update users
  set avatar = av,
  avatar_type = av_type
  where uid = user_id;

  return;
end;
$$ language plpgsql;

create function delete_place_booking(oid integer, fid integer, pid integer)
  returns void as $$
begin
  delete 
  from ordered_places
  where order_id = oid
    and flight_id = fid
    and place_id = pid;

  return;
end;
$$ language plpgsql;

create function add_luggage_to_booking(oid integer, fid integer, lug integer)
  returns void as $$
begin
  update ordered_flights
  set luggage_kg = lug
  where flight_id = fid
    and order_id = oid;

  return;
end;
$$ language plpgsql;

create function get_all_flights()
  returns table (ff flight_admin) as $$
begin
  return query
    select *
    from flights
      natural join luggage_prices;
end;
$$ language plpgsql;

create function get_types_prices(fid integer)
  returns table(tn varchar(255), tp integer) as $$
begin
  return query
    select
      type_name,
      price
    from type_prices
      natural join place_types
    where flight_id = fid;
end;
$$ language plpgsql;

create or replace function get_planes()
  returns table(pls plane_with_rows) as $$
begin
  return query
    select
      plane_id,
      type as plane_type,
      max_kg,
      places_rows as "rows",
      places_columns as "columns"
    from planes
      natural join luggage_schemas;
end;
$$ language plpgsql;

create function get_place_type_names(plid integer)
  returns table(tname varchar(255)) as $$
begin
  return query
    select type_name
    from place_types
    where plane_id = plid;
end;
$$ language plpgsql;

create function get_plane_by_id(plid integer)
  returns plane as $$
declare ret plane;
begin
  select
    plane_id,
    type as plane_type,
    max_kg
  into ret
  from planes
    natural join luggage_schemas
    where plane_id = plid;

  return ret;
end;
$$ language plpgsql;

create or replace function add_flight
  (cfrom varchar(255),
  cto varchar(255),
  dfrom timestamp,
  dto timestamp,
  plid integer,
  frkg integer,
  prkg integer)
returns integer as $$
declare fid integer;
begin
    insert into flights
      (city_from, city_to, date_from, date_to, plane_id)
    values 
      (cfrom, cto, dfrom, dto, plid)
    returning flight_id
      into fid;

    insert into luggage_prices
      values (fid, frkg, prkg);

    return fid;
end;
$$ language plpgsql;

create or replace function add_type_price(fid integer, pid integer, tname varchar(255), prc integer)
returns void as $$
declare tid integer;
begin
  select type_id
  into tid
  from place_types
  where plane_id = pid
    and type_name = tname;

  insert into type_prices
  values (tid, fid, prc);

  return;
end;
$$ language plpgsql;

create function add_plane(ptype varchar(255), prows integer, pcolumns integer, pkg integer)
returns integer as $$
declare plid integer;
begin
  insert into planes
    (type, places_rows, places_columns)
  values (ptype, prows, pcolumns)
  returning plane_id
    into plid;

  insert into luggage_schemas
    (plane_id, max_kg)
  values (plid, pkg);

  return plid;
end;
$$ language plpgsql;

create function add_type_for_plane(plid integer, tname varchar(255))
returns integer as $$
declare tid integer;
begin
  insert into place_types
    (plane_id, type_name)
  values(plid, tname)
  returning type_id
    into tid;

  return tid;
end;
$$ language plpgsql;

create function add_place_for_plane(plid integer, tid integer, pnum varchar(255))
returns void as $$
begin
  insert into places
    (type_id, plane_id, place_number)
  values (tid, plid, pnum);

  return;
end;
$$ language plpgsql;