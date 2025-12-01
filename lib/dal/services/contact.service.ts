import { contactRepository } from "../repositories/contact.repository";
import { logger } from "@/lib/helpers";

export class ContactService {
  async getAllMessages() {
    return await contactRepository.findAll();
  }

  async getMessageById(id: string) {
    const message = await contactRepository.findById(id);
    if (!message) {
      throw new Error("Message not found");
    }
    return message;
  }

  async getUnreadMessages() {
    return await contactRepository.findUnread();
  }

  async createMessage(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    const created = await contactRepository.create(data);
    logger.info("Contact message created", {
      id: created.id,
      email: created.email,
    });
    await contactRepository.createLog(created.id, "CREATED", {
      subject: created.subject,
    });
    return created;
  }

  async markAsRead(id: string) {
    return await contactRepository.markAsRead(id);
  }

  async deleteMessage(id: string) {
    const res = await contactRepository.delete(id);
    logger.info("Contact message deleted", { id });
    return res;
  }

  async updateStatus(id: string, status: "PENDING" | "DELIVERED") {
    const updated = await contactRepository.updateStatus(id, status);
    await contactRepository.createLog(id, "STATUS_CHANGED", { status });
    logger.info("Contact message status updated", { id, status });
    return updated;
  }

  async getLogs() {
    return await contactRepository.getLogs();
  }
}

export const contactService = new ContactService();
