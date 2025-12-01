import { prisma } from "@/lib/prisma";

export class ContactRepository {
  async findAll() {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return await prisma.contactMessage.findUnique({
      where: { id },
    });
  }

  async findUnread() {
    return await prisma.contactMessage.findMany({
      where: { isRead: false },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    return await prisma.contactMessage.create({
      data: {
        ...data,
        isRead: false,
      },
    });
  }

  async markAsRead(id: string) {
    return await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async delete(id: string) {
    return await prisma.contactMessage.delete({
      where: { id },
    });
  }

  async updateStatus(id: string, status: "PENDING" | "DELIVERED") {
    return await (prisma as any).contactMessage.update({
      where: { id },
      data: { status },
    });
  }

  async createLog(messageId: string, action: string, details?: any) {
    return await (prisma as any).contactLog.create({
      data: {
        messageId,
        action,
        details,
      },
    });
  }

  async getLogs() {
    return await (prisma as any).contactLog.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
}

export const contactRepository = new ContactRepository();
