import { get_max_profit, price_info } from "../src/get_max_profit";

describe("get_max_profit_errors", () => {
  test("Throws an error if there's not enough prices available to make a sale.", () => {
    const priceinfo = { price: [10, 7] };
    expect(() => get_max_profit(priceinfo)).toThrowError("Number of prices not enough to buy and sell.");
  });
    
  test("Throws an error when a price is $0.", () => {
    const priceinfo = { price: [10, 7, 0, 7, 9] };
    expect(() => get_max_profit(priceinfo)).toThrowError("Prices can't be $0 or below, proceeding to next price.");
  });

  test("Throws an error when a price is negative.", () => {
    const priceinfo = { price: [10, 7, 10, -4, 7, 9] };
    expect(() => get_max_profit(priceinfo)).toThrowError("Prices can't be $0 or below, proceeding to next price.");
  });
});

describe("get_max_profit", () => {
  test("Returns correct max profit and buying/selling price", () => {
    const test_cases: Array<[price_info, number, number, number]> = [
      [{ price: [10, 7, 5, 12, 11, 9] }, 6, 5, 11],
      [{ price: [30, 28, 26, 17, 11, 3, 23, 8, 12, 11, 15, 6, 16, 14] }, 13, 3, 16],
      [{ price: [1, 2, 3, 4, 5, 6] }, 5, 1, 6],
      [{ price: [9, 9, 9, 9, 9, 10] }, 1, 9, 10],
      [{ price: [9, 10, 15, 7, 10, 10] }, 6, 9, 15],
      [{ price: [30, 28, 26, 17, 11, 3, 23, 8, 12, 11, 15, 10, 2, 24] }, 21, 3, 24],
      [{ price: [30, 28, 26, 17, 11, 3, 23, 8, 12, 11, 15, 1, 2, 24] }, 23, 1, 24],
      [{ price: [6, 5, 4, 3, 2, 1] }, 0, 0, 0],
      [{ price: [10, 10, 10, 10, 10, 10] }, 0, 0, 0],
    ];

    test_cases.forEach(([priceinfo, expected_profit, expected_buying_price, expected_selling_price]) => {
      const result = get_max_profit(priceinfo);
      expect(result.max_profit).toBe(expected_profit);
      expect(result.buying_price).toBe(expected_buying_price);
      expect(result.selling_price).toBe(expected_selling_price);
    });
  });
});
