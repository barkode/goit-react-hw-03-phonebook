import { Component } from 'react';
import PropType from 'prop-types';
import css from './ContactList.module.css';

class ContactList extends Component {
  render() {
    const { contacts, handleDeleteContact } = this.props;
    return (
      <ul className={css.list}>
        {contacts.map(({ id, name, number }) => {
          return (
            <li key={id} className={css.listItem}>
              {name} || {number}
              <button
                type="button"
                title="Delete contact"
                onClick={() => handleDeleteContact(id)}
                className={css.button}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ContactList;

ContactList.propTypes = {
  contacts: PropType.arrayOf(
    PropType.shape({
      id: PropType.string.isRequired,
      name: PropType.string.isRequired,
      number: PropType.string.isRequired,
    })
  ),
  handleDeleteContact: PropType.func.isRequired,
};
