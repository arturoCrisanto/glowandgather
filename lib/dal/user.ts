import { prisma } from "@/lib/prisma";
import { User, Prisma } from "@prisma/client";

export class UserDAL {
  // Create a new user
  static async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }

  // Find user by ID
  static async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  // Find user by email
  static async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  // Get all users
  static async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  // Update user
  static async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  // Delete user
  static async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
