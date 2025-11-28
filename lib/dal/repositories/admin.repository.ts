import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const adminRepository = {
  async createAdmin(email: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
  },

  async findAdminByEmail(email: string) {
    return await prisma.admin.findUnique({
      where: { email },
    });
  },

  async findAdminById(id: string) {
    return await prisma.admin.findUnique({
      where: { id },
    });
  },

  async verifyPassword(plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  async updateAdmin(
    id: string,
    data: { name?: string; email?: string; password?: string }
  ) {
    const updateData: any = { ...data };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return await prisma.admin.update({
      where: { id },
      data: updateData,
    });
  },

  async deleteAdmin(id: string) {
    return await prisma.admin.delete({
      where: { id },
    });
  },
  async countAdmins() {
    return await prisma.admin.count();
  },
};
