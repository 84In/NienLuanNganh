import axiosConfig from "../axiosConfig";

export const apiUploadAvatar = (username, formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/api/v1/upload/avatar/${username}`,
        data: formData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
