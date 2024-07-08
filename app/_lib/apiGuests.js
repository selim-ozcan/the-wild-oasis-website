let apiUrl = process?.env?.API_URL;

export async function getGuest(cookie, email) {
  if (!cookie) return null;

  const response = await fetch(`${apiUrl}/guests/${email}`, {
    credentials: "include",
    headers: {
      Cookie: `${cookie.name}=${cookie.value}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const guest = await response.json();
  return guest;
}

export async function updateGuest(cookie, guest, updatedGuest) {
  if (!cookie) return null;

  const response = await fetch(`${apiUrl}/guests/${guest.email}`, {
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify(updatedGuest),
    headers: {
      Cookie: `${cookie.name}=${cookie.value}`,
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
