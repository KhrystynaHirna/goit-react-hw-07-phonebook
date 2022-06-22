import ContactForm from '../phonebookForm/ContactForm';
import ContactList from '../contacts/ContactList';
import Filter from '../filter/Filter';
import s from '../app/App.module.css';

const App = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>
        Phonebook
      </h1>
      <ContactForm />
      <h2 className={s.title}>
        Contacts
      </h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;