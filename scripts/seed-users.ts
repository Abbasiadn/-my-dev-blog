// scripts/seed-users.ts
import { seedUsers } from "../lib/users";

async function seed() {
  console.log("🌱 Seeding users...\n");
  
  const result = await seedUsers();
  
  console.log(`✅ Users seeded successfully!`);
  console.log(`   Created: ${result.created}`);
  console.log(`   Skipped: ${result.skipped}`);
  console.log("\n📋 Test Accounts:");
  console.log("  👑 Admin: admin@devblog.com / admin123");
  console.log("  👤 User:  user@devblog.com / user123");
  console.log("  👑 Admin: elena@devblog.com / admin123");
  console.log("  👤 User:  marcus@devblog.com / user123");
}

seed().catch((error) => {
  console.error("❌ Error seeding users:", error);
  process.exit(1);
});