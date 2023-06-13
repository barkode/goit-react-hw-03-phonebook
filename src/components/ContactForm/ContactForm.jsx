import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropType from 'prop-types';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = { name: '', number: '' };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onAddContact } = this.props;
    const { name, number } = this.state;
    if (name !== '' && number !== '') {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };
      onAddContact(newContact);
      this.reset();
    }
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={css.container}>
        <p className={css['field-name']}>Abonent name</p>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Enter abonent name"
          value={name}
          onChange={this.handleChange}
          required
          className={css.input}
        />
        <p className={css['field-name']}>Abonent phone number</p>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="Enter phone number"
          value={number}
          onChange={this.handleChange}
          required
          className={css.input}
        />
        <p>
          <button type="submit" className={css.button}>
            Add contact
          </button>
        </p>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  newContact: PropType.arrayOf(
    PropType.shape({
      id: PropType.string.isRequired,
      name: PropType.string.isRequired,
      number: PropType.string.isRequired,
    })
  ),
  onAddContact: PropType.func.isRequired,
};
