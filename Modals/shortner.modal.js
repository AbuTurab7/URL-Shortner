import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const Data_File = join(import.meta.dirname, "../Data", "links.json");

export async function saveToFile(data) {
  await writeFile(Data_File, JSON.stringify(data, null, 2));
}

export async function getLinks() {
  try {
    const Links = await readFile(Data_File, "utf-8");
    return JSON.parse(Links);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(Data_File, JSON.stringify({}));
      return {};
    }
    throw error;
  }
}