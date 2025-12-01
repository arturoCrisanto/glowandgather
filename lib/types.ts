export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageSrc: string;
  isBestSeller: boolean;
  isActive: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  status?: "PENDING" | "DELIVERED";
  createdAt: string;
};

export type ContactLog = {
  id: string;
  action: "CREATED" | "STATUS_CHANGED" | string;
  messageId: string;
  details?: any;
  createdAt: string;
};
