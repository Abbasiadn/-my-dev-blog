// lib/categories.ts
import { promises as fs } from "fs";
import path from "path";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
  status: "pending" | "approved" | "blocked";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

const categoriesFile = path.join(process.cwd(), "data", "categories.json");

async function readCategories(): Promise<Category[]> {
  try {
    const data = await fs.readFile(categoriesFile, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeCategories(categories: Category[]) {
  await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
  await fs.writeFile(categoriesFile, JSON.stringify(categories, null, 2));
}

export async function getAllCategories(): Promise<Category[]> {
  return readCategories();
}

export async function getApprovedCategories(): Promise<Category[]> {
  const categories = await readCategories();
  return categories.filter((cat) => cat.status === "approved");
}

export async function getPendingCategories(): Promise<Category[]> {
  const categories = await readCategories();
  return categories.filter((cat) => cat.status === "pending");
}

export async function createCategory(
  categoryData: Omit<Category, "id" | "createdAt" | "updatedAt">
): Promise<Category> {
  const now = new Date().toISOString();
  const category: Category = {
    ...categoryData,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  const categories = await readCategories();
  categories.push(category);
  await writeCategories(categories);

  return category;
}

export async function updateCategoryStatus(
  id: string,
  status: "pending" | "approved" | "blocked"
): Promise<Category | null> {
  const categories = await readCategories();
  const categoryIndex = categories.findIndex((c) => c.id === id);

  if (categoryIndex === -1) return null;

  categories[categoryIndex].status = status;
  categories[categoryIndex].updatedAt = new Date().toISOString();
  await writeCategories(categories);

  return categories[categoryIndex];
}

export async function updateCategory(
  id: string,
  updates: Partial<Omit<Category, "id" | "createdAt">>
): Promise<Category | null> {
  const categories = await readCategories();
  const categoryIndex = categories.findIndex((c) => c.id === id);

  if (categoryIndex === -1) return null;

  categories[categoryIndex] = {
    ...categories[categoryIndex],
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  };
  await writeCategories(categories);

  return categories[categoryIndex];
}

export async function deleteCategory(id: string): Promise<boolean> {
  const categories = await readCategories();
  const filteredCategories = categories.filter((c) => c.id !== id);

  if (filteredCategories.length === categories.length) return false;

  await writeCategories(filteredCategories);
  return true;
}