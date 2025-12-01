import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: "admin@glowandgather.com" },
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists!");
      console.log("📧 Email: admin@glowandgather.com");
      console.log("🔑 Password: admin123");
      return;
    }

    // Create admin with hashed password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.admin.create({
      data: {
        email: "admin@glowandgather.com",
        password: hashedPassword,
        name: "Admin User",
      },
    });

    console.log("✅ Admin created successfully!");
    console.log("📧 Email: admin@glowandgather.com");
    console.log("🔑 Password: admin123");
    console.log("\n⚠️  Please change this password after first login!");
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
