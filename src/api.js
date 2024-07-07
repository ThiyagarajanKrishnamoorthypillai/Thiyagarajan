const API_URL = import.meta.env.VITE_API_URL;

export const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/your-endpoint`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
