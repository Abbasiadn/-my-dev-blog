// lib/users.ts
import { promises as fs } from "fs";
import path from "path";
import { simpleHash } from "./hash";

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: "admin" | "user";
  status: "active" | "blocked" | "pending";
  createdAt: string;
  updatedAt: string;
}

const usersFile = path.join(process.cwd(), "data", "users.json");

async function readUsers(): Promise<StoredUser[]> {
  try {
    const data = await fs.readFile(usersFile, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeUsers(users: StoredUser[]) {
  await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const users = await readUsers();
  return users.find((user) => user.email === email) || null;
}

export async function findUserById(id: string): Promise<StoredUser | null> {
  const users = await readUsers();
  return users.find((user) => user.id === id) || null;
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: "admin" | "user" = "user",
  status: "active" | "blocked" | "pending" = "active"
): Promise<StoredUser | null> {
  const existingUser = await findUserByEmail(email);
  if (existingUser) return null;

  const now = new Date().toISOString();
  const user: StoredUser = {
    id: crypto.randomUUID(),
    email,
    name,
    passwordHash: simpleHash(password),
    role,
    status,
    createdAt: now,
    updatedAt: now,
  };

  const users = await readUsers();
  users.push(user);
  await writeUsers(users);

  return user;
}

export async function verifyCredentials(
  email: string,
  password: string
): Promise<StoredUser | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;

  // Check if user is blocked
  if (user.status === "blocked") return null;

  const passwordHash = simpleHash(password);
  if (passwordHash !== user.passwordHash) return null;

  return user;
}

export async function getAllUsers(): Promise<StoredUser[]> {
  const users = await readUsers();
  return users.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });
}

export async function getActiveUsers(): Promise<StoredUser[]> {
  const users = await readUsers();
  return users.filter((user) => user.status === "active");
}

export async function getPendingUsers(): Promise<StoredUser[]> {
  const users = await readUsers();
  return users.filter((user) => user.status === "pending");
}

export async function getBlockedUsers(): Promise<StoredUser[]> {
  const users = await readUsers();
  return users.filter((user) => user.status === "blocked");
}

export async function updateUserStatus(
  id: string,
  status: "active" | "blocked" | "pending"
): Promise<StoredUser | null> {
  const users = await readUsers();
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) return null;

  users[userIndex].status = status;
  users[userIndex].updatedAt = new Date().toISOString();
  await writeUsers(users);

  return users[userIndex];
}

export async function updateUserRole(
  id: string,
  role: "admin" | "user"
): Promise<StoredUser | null> {
  const users = await readUsers();
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) return null;

  users[userIndex].role = role;
  users[userIndex].updatedAt = new Date().toISOString();
  await writeUsers(users);

  return users[userIndex];
}

export async function updateUser(
  id: string,
  updates: Partial<Omit<StoredUser, "id" | "createdAt">>
): Promise<StoredUser | null> {
  const users = await readUsers();
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) return null;

  users[userIndex] = {
    ...users[userIndex],
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  };
  await writeUsers(users);

  return users[userIndex];
}

export async function deleteUser(id: string): Promise<boolean> {
  const users = await readUsers();
  const filteredUsers = users.filter((u) => u.id !== id);

  if (filteredUsers.length === users.length) return false;

  await writeUsers(filteredUsers);
  return true;
}

export async function approveUser(id: string): Promise<StoredUser | null> {
  return updateUserStatus(id, "active");
}

export async function blockUser(id: string): Promise<StoredUser | null> {
  return updateUserStatus(id, "blocked");
}

export async function unblockUser(id: string): Promise<StoredUser | null> {
  return updateUserStatus(id, "active");
}

export async function seedUsers(): Promise<{ created: number; skipped: number }> {
  const defaultUsers = [
    {
      email: "admin@devblog.com",
      password: "admin123",
      name: "Admin User",
      role: "admin" as const,
      status: "active" as const,
    },
    {
      email: "user@devblog.com",
      password: "user123",
      name: "Regular User",
      role: "user" as const,
      status: "active" as const,
    },
    {
      email: "elena@devblog.com",
      password: "admin123",
      name: "Elena Voss",
      role: "admin" as const,
      status: "active" as const,
    },
    {
      email: "marcus@devblog.com",
      password: "user123",
      name: "Marcus Chen",
      role: "user" as const,
      status: "pending" as const,
    },
    {
      email: "blocked@devblog.com",
      password: "user123",
      name: "Blocked User",
      role: "user" as const,
      status: "blocked" as const,
    },
  ];

  let created = 0;
  let skipped = 0;

  for (const user of defaultUsers) {
    const existingUser = await findUserByEmail(user.email);
    if (existingUser) {
      skipped++;
      continue;
    }

    const result = await createUser(
      user.email,
      user.password,
      user.name,
      user.role,
      user.status
    );
    
    if (result) {
      created++;
    } else {
      skipped++;
    }
  }

  return { created, skipped };
}