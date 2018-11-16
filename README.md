[![Build Status](https://travis-ci.com/revskill10/next-template.svg?branch=master)](https://travis-ci.com/revskill10/next-template)
[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/revskill10/next-template)


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