const ContactCard = ({ contact, contactKey, onClick }) => {
  return (
    <div className="bg-teal-200 flex items-center rounded-lg p-2 mb-2" onClick={() => onClick(contactKey)}>
      <div className="bg-teal-600 rounded-full text-teal-50 w-10 h-10">
        <div className="text-center text-2xl pt-1 uppercase">{contact.firstName.charAt(0)}</div>
      </div>
      <div className="pl-2">
        <div className="text-lg">
          {contact.firstName} {contact.lastName}
        </div>
        {contact.email && <div className="text-sm">{contact.email}</div>}
        {contact.phone && <div className="text-sm">{contact.phone}</div>}
      </div>
    </div>
  );
};

export default ContactCard;
