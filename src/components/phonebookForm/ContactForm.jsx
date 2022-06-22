import { useState, useEffect } from 'react';
import { getItems, addContacts } from 'redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import shortid from 'shortid';
import s from './ContactForm.module.css';

  const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const contacts = useSelector(getItems);
  const dispatch = useDispatch();
  
  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    dispatch(addContacts(contact));
    reset();
  };

  useEffect(() => {
    setIsDisabled(false);
    const contactFinder = contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (contactFinder) {
      setIsDisabled(true);
      Notify.warning(`${name} ${number} is already in contacts.`);
      reset();
    }
  }, [name, number, contacts]);

  return (
    <form onSubmit={handleSubmit} className={s.container}>
      <label className={s.label}>
        Name:
        <input
          type="text"
          name="name"
          className={s.input_first }
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
          required />
      </label>
          
      <label className={s.label}>
        Number:
        <input
          type="tel"
          className={s.input_second}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          name="number"
          onChange={e => setNumber(e.currentTarget.value)}
          required />
      </label>

      <button
        className={s.button}
        type="submit"
        disabled={isDisabled}>
        add contact    
      </button>
    </form>
  );
};

export default ContactForm;