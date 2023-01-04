### Installation and Usage

1. Run docker compose command:
   ```sh
    docker-compose up -d
   ```
2. It will generate one containers with two instances inside:
    1. graphql: NodeJS app using TypeScript/TypeORM for GraphQL and API Rest Endpoints with Express
    2. postgres: Database instance, generated with "pizza_db" schema containing pre-seeded data from migrations

3. Links:
   1. GraphQL (Apollo): http://localhost:8090/graphql
   2. Api Endpoints: http://localhost:8090/api
        1. http://localhost:8090/api/sales/by-date/ 
        2. http://localhost:8090/api/sales/by-date/by-week/
        3. http://localhost:8090/api/ingredients/by-date/
        4. http://localhost:8090/api/ingredients/by-date/by-week/
    For any of the endpoints, we should send parameter on the body for filtering (being PizzaType optional):
        1. date_from
        2. date_to
        3. pizza_type

4. Inside apollo, we can find 4 pre-built queries aligned to the requisites:
    ```sh
    You need to create a graphQL API that will return data with these filters:

    time: (period start date, end date) or per selected calendar month
    selected pizza(s) or all pizza

    You should be able to query the following information through the above filters.

    Number of unit sold
    Number of ingredients used
    Cost of ingredients
    Sales
    ```
5. In order to have a better data management and storage, I normalized the model from the assumptions:
    - https://docs.google.com/spreadsheets/d/1byShULmKZCmGqfLSUwh1RWWcEUPgZq3FRwYHJpV1ZXo/edit?usp=sharing

    Into the following tables:
    
    * Ingredient: List of ingredients with their unit and cost.
    * Order: List of orders per day and pizza type
    * Pizza_Type: List of available pizza types with their respective "price"
    * Recipe: List of ingredients per pizza type with their necessary quantity.
    * Unit: List of available units
