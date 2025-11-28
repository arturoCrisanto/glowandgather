import {
  userRepository,
  UserRepository,
} from "../repositories/user.repository";
import { User, Prisma } from "@prisma/client";

/**
 * User Service
 * Contains business logic for User operations
 */
export class UserService {
  constructor(private userRepository: UserRepository) {}

  // Create a new user with validation
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    // Check if email already exists
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    return this.userRepository.create(data);
  }

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  // Get user by email
  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  // Get all users with pagination
  async getAllUsers(options?: {
    page?: number;
    limit?: number;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<{ users: User[]; total: number; page: number; limit: number }> {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 10;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.userRepository.findAll({
        skip,
        take: limit,
        orderBy: options?.orderBy ?? { createdAt: "desc" },
      }),
      this.userRepository.count(),
    ]);

    return {
      users,
      total,
      page,
      limit,
    };
  }

  // Update user
  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    // Check if user exists
    const exists = await this.userRepository.exists(id);
    if (!exists) {
      throw new Error("User not found");
    }

    // If updating email, check if new email is already taken
    if (data.email && typeof data.email === "string") {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error("Email is already in use by another user");
      }
    }

    return this.userRepository.update(id, data);
  }

  // Delete user
  async deleteUser(id: string): Promise<User> {
    // Check if user exists
    const exists = await this.userRepository.exists(id);
    if (!exists) {
      throw new Error("User not found");
    }

    return this.userRepository.delete(id);
  }

  // Check if user exists
  async userExists(id: string): Promise<boolean> {
    return this.userRepository.exists(id);
  }

  // Check if email is available
  async isEmailAvailable(email: string): Promise<boolean> {
    const exists = await this.userRepository.emailExists(email);
    return !exists;
  }
}

// Export singleton instance
export const userService = new UserService(userRepository);
