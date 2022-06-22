import s from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, getFilter } from '../../redux/contactsSlice'

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  return (
    <div className={s.label}>
      <p>Find contacts by name</p>
      <input
        className={s.input}
        name="filter"
        value={filter}
        onChange={e => dispatch(setFilter(e.currentTarget.value))}/>
    </div>
  );
};

export default Filter;