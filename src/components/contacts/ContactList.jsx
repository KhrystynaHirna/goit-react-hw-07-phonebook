import s from './ContactList.module.css';      
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/contactsSlice';
import { useGetContactsQuery, useDeleteContactMutation } from 'redux/contactsApi';

  const ContactList = () => {
  const { data} = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const filter = useSelector(getFilter);
 

  const filteredContacts = () => {
    return data.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  let rendered = filter === '' ? data : filteredContacts();
  return (
    <>
      <ul className={s.list}>
        {data &&
          rendered.map(({ name, id, number }) => (
          <li className={s.item} key={id} id={id}>
            {name}: {number}

            <button
              type="button"
              className={s.button}
              onClick={() => deleteContact(id)}>
            Delete
            </button>
          </li>
        ))}
      </ul>
      {data && data.length === 0 && (
        <p>no contacts available</p>
      )}
    </>
  );
};

export default ContactList;