import axios from "axios";

export const getTags = async () => {
  try {
    console.log('getTags')
    const token = JSON.parse(localStorage.getItem("auth")).token;

    const response = await axios.get(
      "http://localhost:8080/api/v1/tag/get-tags",
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    // Handle error here (logging, rethrowing, etc.)
    console.error("Error fetching tags:", error);
    throw error; // Rethrow the error to be handled where getTags() is called
  }
};
