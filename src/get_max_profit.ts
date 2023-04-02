// Program to determine maximum profit for a day

// Scenario:
// --The indices are the time in minutes past trade opening time, which was 10:00am local time.
// --The values are the price in dollars of the Latitude Financial stock at the time.
// --So if the stock cost $5 at 11:00am, stock_prices_yesterday[60] = 5.

// Constraints:
// --You must buy before you sell.
// --You may not buy and sell in adjacent time step (i.e. > 1 minute at a minimum must pass between the purchase and sale).

// Assumptions:
// --There should at least be 3 prices in the list to be able to buy and sell.
// --All prices in the list should be more than $0.
// --All prices in the list should be an integer.

export interface price_info {
	price: number[];
};

interface profit_info {
	max_profit: number;
	buying_price: number;
	selling_price: number;
};

export function get_max_profit( priceinfo: price_info): profit_info
{
	const { price } = priceinfo;
	let number_of_prices = price.length;
	// Throw an error if there's not enough prices available to make a sale.
	if (number_of_prices < 3) {
		throw new Error("Number of prices not enough to buy and sell.");
	}

	let buying_price = 0;
	let current_price = 0;
	let current_profit = 0;
	let max_profit = 0;
	let next_price = 0;
	let selling_price = 0;

	// Will loop until the 3rd to the last price only.
	for (let i = 0; i < number_of_prices-2; i++) {
		//Will skip a price if it is either zero or negative in value.
		if (price[i] <= 0) {
			throw new Error("Prices can't be $0 or below, proceeding to next price.");
		}
		current_price = price[i];
		// Compare current price to the next available prices.
		for (let j = i+2; j < number_of_prices; j++) {
			next_price = price[j];
			if (next_price <= current_price) {
				continue;
			}
			if (current_price < next_price) {
				current_profit = next_price - current_price;
				if (current_profit > max_profit) {
					max_profit = current_profit
					buying_price = current_price
					selling_price = next_price
				}
			}
		}
	}
	return {
		max_profit,
		buying_price,
		selling_price,
	}
};

// Test Cases
const test_cases: price_info[] = [
	{ price: [10, 7, 5, 12, 11, 9] },										//sample list provided, with profit, $5 & $11
	{ price: [30, 28, 26, 17, 11, 3, 23, 8, 12, 11, 15, 6, 16, 14] },		//sample list provided, with profit, $3 & $16
	{ price: [1, 2, 3, 4, 5, 6] },											//case with profit, incremental price, $1 & $6
	{ price: [9, 9, 9, 9, 9, 10] },											//case with profit
	{ price: [9, 10, 15, 7, 10, 10] },										//case with profit, 2 options, first one max profit, $9 & $15
	{ price: [30, 28, 26, 17, 11, 3, 23, 8, 12, 11, 15, 10, 2, 24] },		//case with profit, highest profit not valid for selling ($2 & $24)
	{ price: [30, 28, 26, 17, 11, 3, 23, 8, 12, 11, 15, 1, 2, 24] },		//case with profit, multiple options, last one max profit ($1 & $24)
	{ price: [10, 7, 0, 7, 9] },											//case with profit, price with $0 value
	{ price: [10, 7, 10, -4, 7, 9] },										//case with profit, price with negative value
	{ price: [6, 5, 4, 3, 2, 1] },											//case without profit, decremental price
	{ price: [10, 10, 10, 10, 10, 10] },									//case without profit, prices are the same
	{ price: [10, 7] },														//case without profit, not enough prices to make a sale
];

// Call function
test_cases.forEach((priceinfo, i) => {
  try {
	const result = get_max_profit(priceinfo);
	console.log(`Test Case #${i + 1}: Max profit of $${result.max_profit} (buying for $${result.buying_price} and selling for $${result.selling_price}).`);
  } catch (e) {
	console.log(`Test Case #${i + 1}: ${e.message}`);
  }
});