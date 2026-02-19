import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "d3v7gvb0",
  dataset: "production",
  apiVersion: "2026-02-17",
  useCdn: true,
});