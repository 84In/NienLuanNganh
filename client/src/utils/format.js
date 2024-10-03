export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
};

export const formatLengthName = (name) => {
  if (name?.length > 15) {
    return name?.slice(0, 12) + "...";
  }
  return name;
};

export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const mineType = file.type;

    reader.onloadend = () => {
      const base64String = reader.result.replace(/^data:.+;base64,/, "");
      resolve({ data: base64String, mineType: mineType });
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export const base64ToBlob = (imageObject) => {
  const { data: base64String, mimeType } = imageObject;

  const byteChars = atob(base64String);

  const byteNumbers = new Array(byteChars.length);

  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], { type: mimeType });
};
export const capitalizeFirstLetterIfNeeded = (string) => {
  // Lấy ký tự đầu tiên
  const firstChar = string.charAt(0);

  // Kiểm tra xem ký tự đó có phải là chữ in hoa không
  if (firstChar === firstChar.toUpperCase()) {
    return string; // Nếu đã in hoa, trả về chuỗi gốc
  }

  // Nếu chưa in hoa, chuyển ký tự đầu thành chữ in hoa
  return firstChar.toUpperCase() + string.slice(1);
};
