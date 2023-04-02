"use strict";
// Program to determine maximum profit for a day
exports.__esModule = true;
exports.get_max_profit = void 0;
;
;
function get_max_profit(priceinfo) {
    var price = priceinfo.price;
    var number_of_prices = price.length;
    // Throw an error if there's not enough prices available to make a sale.
    if (number_of_prices < 3) {
        throw new Error("Number of prices not enough to buy and sell.");
    }
    var buying_price = 0;
    var current_price = 0;
    var current_profit = 0;
    var max_profit = 0;
    var next_price = 0;
    var selling_price = 0;
    // Will loop until the 3rd to the last price only.
    for (var i = 0; i < number_of_prices - 2; i++) {
        //Will skip a price if it is either zero or negative in value.
        if (price[i] <= 0) {
            throw new Error("Prices can't be $0 or below, proceeding to next price.");
        }
        current_price = price[i];
        // Compare current price to the next available prices.
        for (var j = i + 2; j < number_of_prices; j++) {
            next_price = price[j];
            if (next_price <= current_price) {
                continue;
            }
            if (current_price < next_price) {
                current_profit = next_price - current_price;
                if (current_profit > max_profit) {
                    max_profit = current_profit;
                    buying_price = current_price;
                    selling_price = next_price;
                }
            }
        }
    }
    return {
        max_profit: max_profit,
        buying_price: buying_price,
        selling_price: selling_price
    };
}
exports.get_max_profit = get_max_profit;
;
// Test Cases
var test_cases = [
    { price: [10, 7, 5, 12, 11, 9] },
    { price: [30, 28, 26, 17, 11, 3, 23, 8, 12, 11, 15, 6, 16, 14] },
    { price: [1, 2, 3, 4, 5, 6] },
    { price: [9, 9, 9, 9, 9, 10] },
    { price: [9, 10, 15, 7, 10, 10] },
    { price: [30, 28, 26, 17, 11, 3, 23, 8, 12, 11, 15, 10, 2, 24] },
    { price: [30, 28, 26, 17, 11, 3, 23, 8, 12, 11, 15, 1, 2, 24] },
    { price: [10, 7, 0, 7, 9] },
    { price: [10, 7, 10, -4, 7, 9] },
    { price: [6, 5, 4, 3, 2, 1] },
    { price: [10, 10, 10, 10, 10, 10] },
    { price: [10, 7] }, //case without profit, not enough prices to make a sale
];
// Call function
test_cases.forEach(function (priceinfo, i) {
    try {
        var result = get_max_profit(priceinfo);
        console.log("Test Case #" + (i + 1) + ": Max profit of $" + result.max_profit + " (buying for $" + result.buying_price + " and selling for $" + result.selling_price + ").");
    }
    catch (e) {
        console.log("Test Case #" + (i + 1) + ": " + e.message);
    }
});
