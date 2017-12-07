DROP TABLE IF EXISTS "forums";

DROP TABLE IF EXISTS "users";

DROP TABLE IF EXISTS "threads";


CREATE TABLE "forums" (
  "slug"    CITEXT,
  "title"   TEXT,
  "description" TEXT,
  "vote_type" INT4,
  "delete_message" BOOLEAN,
  "author"  TEXT,
  "created" TIMESTAMP WITH TIME ZONE DEFAULT now()
) WITH (
OIDS = FALSE
);

DROP INDEX IF EXISTS index_on_forums_slug;

CREATE UNIQUE INDEX  index_on_forums_slug
  ON forums (slug);


CREATE TABLE "users" (
  "email"    CITEXT,
  "nickname" CITEXT,
  "password" TEXT
) WITH (
OIDS = FALSE
);

DROP INDEX IF EXISTS index_on_users_email;

CREATE UNIQUE INDEX index_on_users_email
  ON users (email);

DROP INDEX IF EXISTS index_on_users_nickname;

CREATE UNIQUE INDEX index_on_users_nickname
  ON users (nickname);

CREATE TABLE "threads" (
  "created" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "forum"   CITEXT,
  "description" TEXT,
  "slug"    CITEXT,
  "title"   TEXT
) WITH (
OIDS = FALSE
);

DROP INDEX IF EXISTS threads_slug_key;

CREATE UNIQUE INDEX threads_slug_key ON threads (slug) WHERE slug != '';

INSERT INTO users (nickname, email, password) VALUES ('admin', 'admin@admin.ru', 'admin')