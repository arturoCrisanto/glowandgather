import { adminRepository } from "../repositories";
import { logger, AppError } from "@/lib/helpers";

export const adminService = {
  async registerAdmin(email: string, password: string, name: string) {
    try {
      logger.info("Registering admin", { email, name });

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new AppError(400, "Invalid email format");
      }

      if (password.length < 8) {
        throw new AppError(400, "Password must be at least 8 characters long");
      }

      if (name.trim().length < 2) {
        throw new AppError(400, "Name must be at least 2 characters long");
      }

      const existingAdmin = await adminRepository.findAdminByEmail(email);
      if (existingAdmin) {
        throw new AppError(400, "Admin with this email already exists");
      }

      const admin = await adminRepository.createAdmin(email, password, name);
      const { password: _, ...adminWithoutPassword } = admin;

      logger.info("Admin registered successfully", { adminId: admin.id });
      return adminWithoutPassword;
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error("Failed to register admin", error, { email, name });
      throw new AppError(500, "Failed to register admin");
    }
  },

  async loginAdmin(email: string, password: string) {
    try {
      logger.info("Admin login attempt", { email });

      if (!email || !password) {
        throw new AppError(400, "Email and password are required");
      }

      const admin = await adminRepository.findAdminByEmail(email);
      if (!admin) {
        throw new AppError(401, "Invalid email or password");
      }

      const isValidPassword = await adminRepository.verifyPassword(
        password,
        admin.password
      );
      if (!isValidPassword) {
        throw new AppError(401, "Invalid email or password");
      }

      const { password: _, ...adminWithoutPassword } = admin;
      logger.info("Admin logged in successfully", { adminId: admin.id });
      return adminWithoutPassword;
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error("Failed to login admin", error, { email });
      throw new AppError(500, "Failed to login admin");
    }
  },

  async getAdminById(id: string) {
    try {
      logger.debug("Getting admin by ID", { id });

      const admin = await adminRepository.findAdminById(id);
      if (!admin) {
        throw new AppError(404, "Admin not found");
      }

      const { password: _, ...adminWithoutPassword } = admin;
      return adminWithoutPassword;
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error("Failed to get admin by ID", error, { id });
      throw new AppError(500, "Failed to get admin");
    }
  },

  async updateAdmin(
    id: string,
    data: { name?: string; email?: string; password?: string }
  ) {
    try {
      logger.info("Updating admin", { id, fields: Object.keys(data) });

      if (data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          throw new AppError(400, "Invalid email format");
        }

        const existingAdmin = await adminRepository.findAdminByEmail(
          data.email
        );
        if (existingAdmin && existingAdmin.id !== id) {
          throw new AppError(400, "Email already taken");
        }
      }

      if (data.password && data.password.length < 8) {
        throw new AppError(400, "Password must be at least 8 characters long");
      }

      if (data.name && data.name.trim().length < 2) {
        throw new AppError(400, "Name must be at least 2 characters long");
      }

      const admin = await adminRepository.updateAdmin(id, data);
      const { password: _, ...adminWithoutPassword } = admin;

      logger.info("Admin updated successfully", { adminId: admin.id });
      return adminWithoutPassword;
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error("Failed to update admin", error, { id });
      throw new AppError(500, "Failed to update admin");
    }
  },

  async deleteAdmin(id: string) {
    try {
      logger.info("Deleting admin", { id });

      const admin = await adminRepository.findAdminById(id);
      if (!admin) {
        throw new AppError(404, "Admin not found");
      }

      // Prevent deletion if it's the last admin
      const adminCount = await adminRepository.countAdmins();
      if (adminCount <= 1) {
        throw new AppError(400, "Cannot delete the last admin account");
      }

      await adminRepository.deleteAdmin(id);
      logger.info("Admin deleted successfully", { adminId: id });

      return { message: "Admin deleted successfully" };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error("Failed to delete admin", error, { id });
      throw new AppError(500, "Failed to delete admin");
    }
  },
};
