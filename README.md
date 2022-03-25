# Node Challenge

Take home test for Node.js developers.

## The challenge

This challenge has been designed to measure your knowledge of Node.js, Express, Typescript and various technologies, like monorepos, databases and testing. For your exercise, you will be enhancing this API which serves as the backend for the Pleo app. Whenever a user of the app navigates to the expenses view, it calls this API to collect the list of expenses for that user.

Your objective is to write this new route to fetch the list of expenses for a given user. Right now that domain is empty, so you'll have to build everything from scratch- but you can look over at the user domain for inspiration. Please make sure that the endpoint scales adequately and supports paging, sorting and filtering. Additionally, we would also like you to write some tests for your route.

Finally, as a bonus objective, try to improve any aspect of this API. It could be to add more TS types, better security, tests, add features, graphql support, etc. 

## Instructions

Fork this repo with your solution. Ideally, we'd like to see your progression through commits, and don't forget to update the README.md to explain your thought process.

Please let us know how long the challenge takes you. We're not looking for how speedy or lengthy you are. It's just really to give us a clearer idea of what you've produced in the time you decided to take. Feel free to go as big or as small as you want.

## Install

Make sure that you have a modern version of `yarn` that supports workspaces (`>= 1.0`), then run:

```bash
yarn
```

You will also need to [install Postgres](https://www.postgresqltutorial.com/install-postgresql-macos/), create a `challenge` database and load the sql file `dump.sql`:

```bash
psql challenge < dump.sql
```

## Start

To enable logs, use the standard `NODE_DEBUG` flag with the value `DEBUG`

```bash
NODE_DEBUG=DEBUG yarn start
```

## Test

Make sure that you have a modern version of `yarn` that supports workspaces, then run:

```bash
yarn test
```

The command above will run the following test suites sequentially:

| Test suite | Run command | Description |
-------------|-------------|-------------|
| Unit | `yarn test:unit` | Simple unit tests. |
| Mid-level | `yarn test:mid-level` | Small integration tests that integration of small components together.  |
| Acceptances | `yarn test:acceptance` | Large integration tests, system tests, end-to-end tests. |


Happy hacking 😁!

##  My Thought Process
- My first step towards this project was to run the postgresql on my end.
- Steps: 1. Download and install Postgres.
         2. Create a database named 'challenge'.
         3. Run 'psql challenge < dump.sql' to create required tables and add data to those tables.
- Secondly, I tried to understand package.json to see what is happening on the project before getting into the coding.
- I tried running yarn. 
- By running 'yarn watch', I was able to try the existing already created api routes: '/healthcheck', '/readycheck' and '/user/v1/get-user-details'
- After trying the api '/user/v1/get-user-details', and seeing it on code level, I realised that it can be used to get user details by passing the id as a parameter. For example '/user/v1/get-user-details/userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474'
- I looked through all the other files such as formatter.ts, server.ts and the files inside package folder to understand the code.
- Now with everything understood, I started creating my new routes.
- Steps: 
1. Added dependencies to package.json of expenses folder.
2. Created types.ts for the expenses folder.
3. Created formatter.ts for the expenses folder.
4. Created model.ts for expenses,to create a method to be able to retrieve expenses.
5. Now that we have everything to call the route, I created a route folder, under which we have v1-get-expense.ts. Whenever the route /get-expense-details is called, the method getExpenseDetails is called.
6. I added filters by adding a parameter called searchValue. The searchValue parameter can either be 'status', 'merchant_name' or 'currency'. For example if the api is passed with searchValue as 'BRUS' which is merchan name, it will return all the expenses with that particular merchant name. The api route can either be passed with atleast expenseId or checkValue or even both. If neither of them are passed then a error will be displayed.
7. Next, I added sorting by adding 'orderBy' and 'sort' parameters. The 'orderBy' should contain the name of the column by which you would want to sort the results. For example, orderBy can be 'merchant_name' or 'status'. The 'sort' parameter is optional if it not passed the sorting will happen in ascending order. The sort value must be either ASC (ascending) or DESC(descending). Passing any other value to 'sort' will throw an error.
8. For Paging, I added two other parameters called 'page' and 'pageSize'. 'page' includes the page number you want and 'pageSize' includes the total number of expenses in one single page. The 'page' and 'pageSize' must be numeric or else it will throw an error.
9. To improve the user, I added a new api route 'user/v1/get-user-expenses' that gets userExpenses for one particular user. It expect one parameter userId, if it't not given, it throws an error.
- For more improvement to the code, I changed the interface User attribute names to follow camelcase naming convention. 
 
Routes Examples:
***"http://localhost:9001/expenses/v1/get-expense-details?searchValue=processed&page=2&pageSize=2"***
<img width="455" alt="image" src="https://user-images.githubusercontent.com/60020321/160188625-21b0655f-5796-4f07-a2c6-d2098ff30530.png">

***"http://localhost:9001/expenses/v1/get-expense-details?expenseId=3e920f54-49df-4d0b-b11b-e6f08e3a2dca"***
<img width="476" alt="image" src="https://user-images.githubusercontent.com/60020321/160188778-d25f2aae-385b-4f0a-92be-e0403dafb9c1.png">

***"http://localhost:9001/expenses/v1/get-expense-details?searchValue=processed&orderBy=merchant_name"***
<img width="500" alt="image" src="https://user-images.githubusercontent.com/60020321/160189354-370450e8-9b42-488e-8367-9301c39f970c.png">

***"http://localhost:9001/user/v1/get-user-expenses/?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474"***
<img width="527" alt="image" src="https://user-images.githubusercontent.com/60020321/160188962-b216913a-cc5a-40cd-b10c-f2e3eb885742.png">


