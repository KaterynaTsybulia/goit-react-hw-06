import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector(selectContacts) || [];
  const filter = useSelector(selectNameFilter) || "";

  const allContacts = contacts.filter(
    (contact) =>
      contact.name &&
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
  );

  return (
    <ul className={css.ulList}>
      {allContacts.map((contact) => (
        <li key={contact.id} className={css.liList}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}
