/* global $, app */
(function () {
  'use strict';

	const sio = io();

  let contacts = [];
  const contactsTable = $('#contactsTable tbody');
  const firstInput = $('#first');
  const lastInput = $('#last');
  const emailInput = $('#email');
  const phoneInput = $('#phone');
  const addContactForm = $("#newContactForm");

  function showContactForm(contact) {
    if (contact) {
      firstInput.val(contact.first);
      lastInput.val(contact.last);
      emailInput.val(contact.email);
      phoneInput.val(contact.phone);

      addContactForm.data('contact', contact);
    }
    addContactForm.slideDown('slow');
  }

  $('#add').click(() => {
    showContactForm();
  });

  function removeContact(contact) {
    contact.row.remove();
    contacts = contacts.filter(c => c !== contact);

    if (!contacts.length) {
      contactsTable.append('<tr><td colspan="5">no contacts loaded</td></tr>');
    }
  }

  function addContactToTable(newContact) {
    if (!contacts.length) {
      $(':first-child', contactsTable).remove();
    }

    contacts.push(newContact);

    const row = $(`
      <tr>
        <td>${newContact.first}</td>
        <td>${newContact.last}</td>
        <td>${newContact.email}</td>
        <td>${newContact.phone}</td>
        <td>
          <button class="edit">edit</button>
          <button class="delete">delete</button>
        </td>
      </tr>
    `).appendTo(contactsTable);

    newContact.row = row;

    row.find('.edit').click(async () => {
      showContactForm(newContact);
    });

    row.find('.delete').click(async () => {
      try {
        const response = await fetch(`/api/contacts/${newContact.id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);//`${response.status} ${response.statusText}`);
        }
        removeContact(newContact);
      } catch (e) {
        app.messageBox.show(`unable to delete contact - ${e.message}`);
      }
    });
  }

  function updateContact(existingContact, newContact) {
    Object.assign(existingContact, newContact);
    const tds = existingContact.row.find('td');
    tds[0].textContent = existingContact.first;
    tds[1].textContent = existingContact.last;
    tds[2].textContent = existingContact.email;
    tds[3].textContent = existingContact.phone;
  }

  addContactForm.submit(async (event) => {
    event.preventDefault();

    const newContact = {
      first: firstInput.val(),
      last: lastInput.val(),
      email: emailInput.val(),
      phone: phoneInput.val()
    };

    const existingContact = addContactForm.data('contact');
    const url = existingContact ? `/api/contacts/${existingContact.id}` : '/api/contacts';
    const method = existingContact ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(newContact),
        headers: {
          'content-type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);//`${response.status} ${response.statusText}`);
      }

      if (existingContact) {
        updateContact(existingContact, newContact);
      }
      resetAndHideForm();
    } catch (e) {
      app.messageBox.show(`unable to add contact - ${e.message}`);
    }
  });

  $('#cancel').click(resetAndHideForm);

  function resetAndHideForm() {
    addContactForm.trigger('reset');
    addContactForm.slideUp('fast');
    addContactForm.data('contact', null);
  }

  async function loadContacts() {
    try {
      const response = await fetch('/api/contacts');
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);//`${response.status} ${response.statusText}`);
      }
      const people = await response.json();

      contacts
        .filter(c => !people.find(p => p.id === c.id))
        .forEach(c => removeContact(c));

      people.forEach(person => {
        const existingContact = contacts.find(c => c.id === person.id);
        if (existingContact) {
          updateContact(existingContact, person);
        } else {
          addContactToTable(person);
        }
      });
    } catch (e) {
      app.messageBox.show(`unable to load contacts - ${e.message}`);
    }
  }

  loadContacts();


	sio.on("deletion", row_id => {
		// evidently MUST be double, not triple equals to work...
		const contact_to_remove = contacts.find(e => e.id == row_id);
		if (! contact_to_remove) {return};
		removeContact(contact_to_remove);
	});

	sio.on("addition", addContactToTable);

	sio.on("updation", row_id => {
		//TODO: robustify
		fetch(`/api/contacts/${row_id}`)
		.then(resp => resp.json())
		.then(contact => {
			updateContact(contacts.find(e => e.id == row_id), contact);
		});
	})
})();
