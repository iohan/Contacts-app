import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== "POST") res.status(405).json({ message: "Method not allowed" });

  const contactId = JSON.parse(req.body);

  const deletedContact = await prisma.contact.delete({ where: { id: contactId } });

  res.json(deletedContact);
};
