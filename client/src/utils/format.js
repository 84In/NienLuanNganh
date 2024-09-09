export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
};

export const formatLengthName = (Name) => {
  if (Name?.length > 15) {
    return Name?.slice(0, 12) + "...";
  }
  return Name;
};
