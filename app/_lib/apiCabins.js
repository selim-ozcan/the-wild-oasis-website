import { notFound } from "next/navigation";

const apiUrl = process.env.API_URL;

export async function getCabin(id) {
  const response = await fetch(`${apiUrl}/cabins/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error get cabin");
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    notFound();
  }

  return data;
}

export async function getCabins() {
  const response = await fetch(`${apiUrl}/cabins`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error get cabins");
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    notFound();
  }

  return data;
}
