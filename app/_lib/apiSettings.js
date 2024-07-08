const apiUrl = process.env.API_URL;

export async function getSettings(cookie) {
  const response = await fetch(`${apiUrl}/settings`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error get settings");
  }

  const data = await response.json();

  return data[0];
}
