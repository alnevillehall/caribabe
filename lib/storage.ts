import { put, del } from "@vercel/blob";

export async function uploadPhoto(file: File | string, filename: string) {
  const blob = await put(filename, file, {
    access: "public",
  });
  return blob.url;
}

export async function deletePhoto(url: string) {
  await del(url);
}
