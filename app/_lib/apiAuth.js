let apiUrl = process?.env?.API_URL;

export async function login({ email, password }) {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
}

export async function getMe(cookie) {
  if (!cookie) return null;

  const response = await fetch(`${apiUrl}/users/me`, {
    credentials: "include",
    headers: {
      Cookie: `${cookie.name}=${cookie.value}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const user = await response.json();
  return user;
}
