[![Build Status](https://travis-ci.com/revskill10/next-template.svg?branch=master)](https://travis-ci.com/revskill10/next-template)
[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/revskill10/next-template)

## Installation

```
curl https://sh.rustup.rs -sSf | sh
rustup toolchain add nightly
rustup target add wasm32-unknown-unknown --toolchain nightly

cargo install cargo-wasm
cargo wasm new <project_name>
cargo wasm build
```

## Style guide


- Create unique index for upserting

```sql
ALTER TABLE the_table ADD CONSTRAINT constraint_name UNIQUE (column1, column2);
```

Reload metadata


### Generate Vapid keys

```js
npm i -g web-push
web-push generate-vapid-keys
```

### Filestack api key

```
{
  viewer {
    project(id:"1809351104c047e5be6a8e3fcc9931d2") {
        stage(name:"master") {
        assetConfig {
          apiKey
        }
      }
    }
  }
}
```

- Select columns of a table

```sql
SELECT column_name
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name   = 'table_name'
```

- Timesstamp trigger

```sql
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON table_name
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
```


## GraphQL

Only use `graphql-tag` to write Graphql Query.

## Get all columns and datatypes, nullability of schema/table

```sql
SELECT
    "pg_attribute".attname                                                    as "column",
    pg_catalog.format_type("pg_attribute".atttypid, "pg_attribute".atttypmod) as "datatype",

    not("pg_attribute".attnotnull) AS "nullable"
FROM
    pg_catalog.pg_attribute "pg_attribute"
WHERE
    "pg_attribute".attnum > 0
    AND NOT "pg_attribute".attisdropped
    AND "pg_attribute".attrelid = (
        SELECT "pg_class".oid
        FROM pg_catalog.pg_class "pg_class"
            LEFT JOIN pg_catalog.pg_namespace "pg_namespace" ON "pg_namespace".oid = "pg_class".relnamespace
        WHERE
            "pg_namespace".nspname = 'public'
            AND "pg_class".relname = 'sche_students'
    );
```