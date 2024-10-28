export const isJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};
export const Utils = {
  months: ({ count }) => {
    const allMonths = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];

    // Lấy số tháng từ 1 đến count
    return allMonths.slice(0, count);
  },
};
