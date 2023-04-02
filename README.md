# Get Stock Max Profit

This is a Typescript solution that will process a price list and show the max profit on a combination of buy and sell of stocks.

## Scenario

* The indices are the time in minutes past trade opening time, which was 10:00am local time.
* The values are the price in dollars of the Latitude Financial stock at the time.
* So if the stock cost $5 at 11:00am, stock_prices_yesterday[60] = 5.

## Constraints

* You must buy before you sell.
* You may not buy and sell in adjacent time step (i.e. > 1 minute at a minimum must pass between the purchase and sale).

## Assumptions

* There should at least be 3 prices in the list to be able to buy and sell.
* All prices in the list should be more than $0.
* All prices in the list should be an integer.

## Samples

```bash
#1
var stock_prices_yesterday = [10, 7, 5, 12, 11, 9];

get_max_profit(stock_prices_yesterday)
# returns 6 (buying for $5 and selling for $11)


#2
var stock_prices_yesterday = [30, 28, 26, 17, 11, 3, 23, 8, 12, 11, 15, 6, 16, 14];

get_max_profit(stock_prices_yesterday)
# returns 13 (buying for $3 and selling for $16)
```

## Solution Approach

The code will take a list and iterate on the contents except the last 2 elements. This is because you won't be able to buy a stock and sell it the next minute (constraint #2 above).

The code will initially validate the list to make sure it has at least 3 price entries (assumption #1 above), this is the minimum to be able to buy and sell. Process will exit for that price list if this is not met. When the list has been validated, it will proceed to loop on the list.

At the first loop(index i), a price is checked if the value is either zero or negative (assumptions #2 & #3 above). If it is, the process will skip and proceed to the next price. 

* If the value(current-price) is valid, a new loop(index j) will be executed against the same list but this time it will start on the current price index + 2(next-price). The difference of the 2 prices will be derived and compared to the saved max profit. 

  * If the difference is bigger than the saved max profit, it will replace the saved max profit, the saved buying price will be replaced by the current-price(first index), and the saved selling price will be replaced by the next-price(second index).
  * If the max profit is bigger, the process will move on and compare the current-price to the next price in the second loop(index j) and so on(this loop will iterate on all elements this time).

Once the 2nd loop is finished iterating, it will continue on to the next price in the first loop. When the first loop is completed, the code will return the values for max profit, buying price and selling price. It will then print messages saying how much the max profit, buying and selling price combinations are for the price lists defined in the Test Cases section. The messages will also include errors caught in the price lists.

## Setup

Clone repository, install NPM if not yet installed.

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Install dependencies.

```bash
> npm ci
```

Install Typescript and Jest

```bash
> npm install -g typescript
> npm install -g --save-dev jest
> npm install --save-dev babel-jest @babel/core @babel/preset-env
> npm install --save-dev @babel/preset-typescript
> npm install --save-dev @types/jest
```

## Running the code

```bash
> npm start

Test Case #1: Max profit of $6 (buying for $5 and selling for $11).
Test Case #2: Max profit of $13 (buying for $3 and selling for $16).
Test Case #3: Max profit of $5 (buying for $1 and selling for $6).
Test Case #4: Max profit of $1 (buying for $9 and selling for $10).
Test Case #5: Max profit of $6 (buying for $9 and selling for $15).
Test Case #6: Max profit of $21 (buying for $3 and selling for $24).
Test Case #7: Max profit of $23 (buying for $1 and selling for $24).
Test Case #8: Prices can't be $0 or below, proceeding to next price.
Test Case #9: Prices can't be $0 or below, proceeding to next price.
Test Case #10: Max profit of $0 (buying for $0 and selling for $0).
Test Case #11: Max profit of $0 (buying for $0 and selling for $0).
Test Case #12: Number of prices not enough to buy and sell.

>
```

## Testing

There are test cases (including 2 samples from the problem description) available (with some descriptions) when the script is run. If a user wants to add another test case, just add an array (line# 87 onwards) in the code. 

```bash
> npm test

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        0.857 s, estimated 1 s
Ran all test suites.

>
```

