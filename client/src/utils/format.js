export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
};

export const formatLengthName = (Name) => {
  if (Name?.length > 15) {
    return Name?.slice(0, 12) + "...";
  }
  return Name;
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

/*const base64String = "iVBORw0KGgoAAAANSUhEUgAAAA..."; // Chuỗi Base64 của bạn
const mimeType = "image/png"; // Loại MIME của hình ảnh
const blob = base64ToBlob(base64String, mimeType);

// Tạo một URL đối tượng để hiển thị hình ảnh
const imageUrl = URL.createObjectURL(blob);
document.getElementById('image').src = imageUrl;
 */
