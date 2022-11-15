import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== "POST") res.status(405).json({ message: "Method not allowed" });

  const contactData = JSON.parse(req.body);

  const updatedContact = await prisma.contact.update({
    where: { id: contactData.id },
    data: {
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      phone: contactData.phone,
      email: contactData.email,
    },
  });

  res.json(updatedContact);
};
