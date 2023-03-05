var express = require('express');
var router = express.Router();

// will come from db eventually
let contacts = [
  { id: 1, first: 'Joe', last: 'Biden', email: 'jbiden@whitehouse.gov', phone: '1234567890' },
  { id: 2, first: 'Kamala', last: 'Harris', email: 'kharris@whitehouse.gov', phone: '9876543210' }
];

let nextId = contacts.length + 1;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('layout', {
    title: 'Contacts',
    contacts,
    noContacts: contacts.length === 0,
    partials: { content: 'contacts' }
  });
});

router.get('/addContact', function (req, res, next) {
  res.render('layout', {
    title: 'Add Contact',
    partials: { content: 'addContact' }
  });
});

router.post('/addContact', function (req, res, next) {
  //console.log('would add contact here', req.body);
  //res.send('would add contact here');
  req.body.id = nextId++;
  contacts.push(req.body);
  res.writeHead(301, {location: '/contacts'});
  res.end();
});


router.get('/editContact/:id', function (req, res, _) {
	selected_contact = contacts.find(c => c.id === +req.params.id);
	res.render('layout', {
		title: 'Edit Contact',
		selected_contact,
		partials: { content: 'editContact' }
	  });
	// res.writeHead(301, { location: '/contacts' });
	res.end();
  });

  router.post('/editContact/:id', function (req, res, _) {
	let idx = contacts.findIndex(c => c.id === +req.params.id)
	contacts[idx] = Object.assign(contacts[idx], req.body);
	res.redirect('/contacts');
	res.end();
  });


router.get('/deleteContact/:id', function (req, res, next) {
  contacts = contacts.filter(c => c.id !== +req.params.id);
  res.writeHead(301, { location: '/contacts' });
  res.end();
});



module.exports = router;
