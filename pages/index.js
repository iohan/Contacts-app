import { PrismaClient } from "@prisma/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import ContactCard from "../components/ContactCard";
import Form from "../components/Form";

const prisma = new PrismaClient();

export const getServerSideProps = async function () {
  const contacts = await prisma.contact.findMany({ orderBy: { firstName: "asc" } });

  return {
    props: {
      initialContacts: contacts,
    },
  };
};

export default function Home({ initialContacts }) {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContact, setSelectedContact] = useState(false);

  const saveContactToDB = async function (contact) {
    const response = await fetch("/api/contacts/create", {
      method: "POST",
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  };

  const updateContactInDB = async function (contact) {
    const response = await fetch("/api/contacts/update", {
      method: "POST",
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  };

  const deleteContactFromDB = async function (id) {
    const response = await fetch("/api/contacts/delete", {
      method: "POST",
      body: JSON.stringify(id),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  };

  const handleFormSubmit = async function (data) {
    try {
      if (selectedContact !== false) {
        // Update Contact
        const newContact = {
          id: selectedContact.id,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
        };

        setSelectedContact(false);

        await updateContactInDB(newContact);

        const updatedContacts = [...contacts].map((contact) => (contact.id === newContact.id ? newContact : contact));
        const sortedContacts = sortContactsByFirstName(updatedContacts);
        setContacts(sortedContacts);
      } else {
        // Create new Contact
        const contactData = { firstName: data.firstName, lastName: data.lastName, phone: data.phone, email: data.email };
        const newContact = await saveContactToDB(contactData);

        const sortedContacts = sortContactsByFirstName([...contacts, newContact]);
        setContacts(sortedContacts);
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleFormCancel = function () {
    setSelectedContact(false);
  };

  const handleFormDelete = async function () {
    const contactToDelete = selectedContact;
    setSelectedContact(false);

    setContacts([...contacts].filter((contact) => contact.id !== contactToDelete.id));

    await deleteContactFromDB(contactToDelete.id);
  };

  const sortContactsByFirstName = function (contacts) {
    const sortedContacts = contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
    return sortedContacts;
  };

  return (
    <div className="bg-cold h-screen">
      <Head>
        <title>Contacts App</title>
        <meta name="description" content="Contacts app by Johan Östling" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-[600px] m-auto py-5">
        <div className="text-xl text-center mb-2 text-soot">Contacts App</div>
        <div className="rounded-lg bg-white drop-shadow-md overflow-clip flex">
          <div className="bg-spruce basis-1/2 pt-3 pb-5">
            <div className="text-lg uppercase text-center pb-3 text-cold">{selectedContact ? "Update Contact" : "Add Contact"}</div>
            <Form onSubmit={handleFormSubmit} onCancel={handleFormCancel} onDelete={handleFormDelete} contact={selectedContact} />
          </div>
          <div className="basis-1/2 bg-red-50 pt-3 pb-5 px-5">
            <div className="text-lg uppercase text-center pb-3 text-soot">Contacts</div>
            {contacts.map((contact, index) => {
              return (
                <div key={index}>
                  <ContactCard contact={contact} onClick={(contact) => setSelectedContact(contact)} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
