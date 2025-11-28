import { prisma } from "@/lib/prisma";
import { User, Prisma } from "@prisma/client";

/**
 * User Repository
 * Handles all database operations for User entity
 */
export class UserRepository {
  // Create a new user
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }

  // Find user by ID
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  // Get all users with optional filters
  async findAll(options?: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    return prisma.user.findMany(options);
  }

  // Count users
  async count(where?: Prisma.UserWhereInput): Promise<number> {
    return prisma.user.count({ where });
  }

  // Update user
  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  // Delete user
  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }

  // Check if user exists
  async exists(id: string): Promise<boolean> {
    const count = await prisma.user.count({
      where: { id },
    });
    return count > 0;
  }

  // Check if email exists
  async emailExists(email: string): Promise<boolean> {
    const count = await prisma.user.count({
      where: { email },
    });
    return count > 0;
  }
}

// Export singleton instance
export const userRepository = new UserRepository();
