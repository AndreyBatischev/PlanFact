Start with
### npm install
next
### `npm start`

Runs the app in the development mode.\

### Examples

example to create data

curl --location 'http://localhost:3001/api/plan-facts' \
--header 'Content-Type: application/json' \
--data '{
    "object": "atom",
    "workType": "build",
    "date": "2024-11-06",
    "planAmount": "333.00",
    "factAmount": "3111.00"
}'

example to get data 

curl --location 'http://localhost:3001/api/plan-facts

with params
curl --location 'http://localhost:3001/api/plan-facts/grouped?startDate=2023-01-01&endDate=2023-12-31&object=atom&workType=build'

### migration

run migrations
npm run migration:run

canseled last migration
migration:revert

create
npm run migration:create ./src/database/migrations/asd