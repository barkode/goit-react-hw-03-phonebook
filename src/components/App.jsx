import { Component } from 'react';
import PropType from 'prop-types';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Jack Jones', number: '975-24-89' },
      { id: 'id-5', name: 'Captain Morgan', number: '227-90-26' },
      { id: 'id-6', name: 'Bilie Joe', number: '217-95-26' },
      { id: 'id-7', name: 'Joe Foster', number: '297-99-26' },
      { id: 'id-8', name: 'Samuel El Jackson', number: '287-04-26' },
      { id: 'id-9', name: 'Annie Milligan', number: '154-44-28' },
    ],
    filter: '',
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  handleAddContact = newContact => {
    const { contacts } = this.state;
    const arrayOfNames = contacts.map(contact => contact.name.toLowerCase());
    const ifAbonentExist = arrayOfNames.find(
      name => newContact.name.toLowerCase() === name
    );
    if (ifAbonentExist) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
      filter: '',
    }));
  };

  handleDeleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterAbonent = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(({ name }) => {
      const abonentName = name.toLowerCase();
      const abonentFilter = filter.toLowerCase();
      return abonentName.includes(abonentFilter);
    });
  };

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = this.handleFilterAbonent();
    return (
      <div className={css.container}>
        <h1>Phone book</h1>
        <ContactForm onAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onFilterChange={this.handleFilterChange} />
        <ContactList
          contacts={filter ? filteredContacts : contacts}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropType.arrayOf(
    PropType.shape({
      id: PropType.string.isRequired,
      name: PropType.string.isRequired,
      number: PropType.string.isRequired,
    })
  ),
};
