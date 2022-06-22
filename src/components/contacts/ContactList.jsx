import s from './ContactList.module.css';
       
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getFilter, getItems } from 'redux/contactsSlice';

  const ContactList = () => {
  const contacts = useSelector(getItems);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  let rendered = filter === '' ? contacts : filteredContacts();
  return (
    <>
      <ul className={s.list}>
        {rendered.map(({ name, id, number }) => (
          <li className={s.item} key={id} id={id}>
            {name}: {number}

            <button
              type="button"
              className={s.button}
              onClick={e => dispatch(deleteContact(e.currentTarget.parentNode.id))}>
            Delete
            </button>
          </li>
        ))}
      </ul>
      {contacts.length === 0 && (
        <p>no contacts available</p>
      )}
    </>
  );
};

export default ContactList;