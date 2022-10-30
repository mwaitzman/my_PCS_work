/* global $ */
(function () {
  'use strict';

  let contacts = [];
  const contactsTable = $('#contactsTable tbody');
  const firstInput = $('#first');
  const lastInput = $('#last');
  const emailInput = $('#email');
  const phoneInput = $('#phone');
  const addContactForm = $("#newContactForm");


  $('#add').click(() => {
    addContactForm.slideDown('slow');
  });


  addContactForm.submit(function (event) {
    event.preventDefault();

    if (!contacts.length) {
      $(':first-child', contactsTable).remove();
    }

    const newContact = {
      first: firstInput.val(),
      last: lastInput.val(),
      email: emailInput.val(),
      phone: phoneInput.val()
    };

	add_contact(newContact);

    resetAndHideForm();
  });


  $('#cancel').click(resetAndHideForm);



  function resetAndHideForm() {
    addContactForm.trigger('reset');

    addContactForm.slideUp('fast');
  }



  function add_contact(contact) {

	contacts.push(contact);

    const row = $(`
      <tr>
        <td>${contact.first}</td>
        <td>${contact.last}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td><button>delete</button></td>
      </tr>
    `).appendTo(contactsTable);


    row.find('button').click(() => {
      row.remove();
      contacts = contacts.filter(c => c !== contact);

      if (!contacts.length) {
        contactsTable.append('<tr><td colspan="5">no contacts loaded</td></tr>');
      }
    });
  }


  $("#load_existing").click(() => {
	if (contacts.length != 0) {
		if (!confirm("WARNING: continuing will clear the contacts table")) {
			return;
		}
		contacts = [];
		//clear the table
		contactsTable.html("");
	} else if (contactsTable.find("tr td:last").text() == "no contacts loaded") {
		contactsTable.html("");
	}
	
	fetch("contacts.json")
	.then(resp => resp.json())
	.then(json => {
		for (let i = 0; i < json.length; i++) {
			add_contact(json[i]);
		}
	})
  });
})();