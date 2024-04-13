import type { IPosts } from '../types/posts';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

export const getPosts = async (pagination: { page: number; limit: number }) => {
  const page = pagination?.page || 1;
  const limit = pagination?.limit || 5;

  const response = await fetch(`${apiBaseUrl}?_page=${page}&_limit=${limit}`);
  const data: IPosts = await response.json();

  return data;
};
