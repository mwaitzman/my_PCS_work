var express = require('express');
var router = express.Router();
const pool = require('../pool.js');
const debug = require('debug')('contactsapi:contactsApiRouter');
const Joi = require('joi');

const contactSchema = Joi.object({
  first: Joi.string()
    .alphanum()
    .min(1)
    .max(128)
    .required(),
  last: Joi.string()
    .alphanum()
    .min(1)
    .max(128)
    .required(),
  email: Joi.string(),
  phone: Joi.string()
});

router.route('/')
  .get(function (req, res, next) {
    debug('getting all contacts');
    pool.query(
      'SELECT * FROM contacts',
      (err, results, fields) => {
        if (err) {
          res.statusCode = 500;
          return res.end('Unable to load contacts');
        }
        res.send(results);
      });
  })
  .post(function (req, res, next) {
    /*if (req.body.first.length < 3 || req.body.first.length > 7) {
      res.statusCode = 422;
      return res.end('first name must be between 3 and 7 characters');
    }*/
    const validationResult = contactSchema.validate(req.body, { abortEarly: false });
    console.log(validationResult);
    if (validationResult.error) {
      res.statusCode = 422;
      return res.end(validationResult.error.message);
    }

    pool.query(
      'INSERT INTO contacts(first, last, email, phone) VALUES (?,?,?,?)', [req.body.first, req.body.last, req.body.email, req.body.phone],
      (err, results, fields) => {
        console.log(results);

        if (err) {
          res.statusCode = 500;
          return res.end('Unable to add contact');
        }

        req.body.id = results.insertId;

		sio.emit("addition", req.body);

        res.status(201)
          .location(`${req.baseUrl}/${req.body.id}`)
          .send(req.body);
      });
  });

router.route('/:id')
  .get((req, res, next) => {
    debug(`getting contact ${req.params.id}`);

    pool.query(
      'SELECT * FROM contacts WHERE id = ?', [req.params.id],
      (err, results, fields) => {
        if (err) {
          res.statusCode = 500;
          return res.end('Unable to load contact');
        }

        if (!results.length) {
          //res.sendStatus(404);
          res.statusCode = 404;
          return res.end(`No such contact - ${req.params.id}`);
        }

        res.send(results[0]);
      });
  })
  .put((req, res, next) => {
    debug(`updating contact ${req.params.id}`);

    // added after class - use same validation we added on post for put
    const validationResult = contactSchema.validate(req.body, { abortEarly: false });
    console.log(validationResult);
    if (validationResult.error) {
      res.statusCode = 422;
      return res.end(validationResult.error.message);
    }
    
    pool.query(
      'UPDATE contacts SET first = ?, last = ?, email = ?, phone =? WHERE id = ?', [req.body.first, req.body.last, req.body.email, req.body.phone, req.params.id],
      (err, results, fields) => {
        if (err) {
          res.statusCode = 500;
          return res.end('Unable to update contact');
        }

        console.log(results);
        if (!results.affectedRows) {
          //res.sendStatus(404);
          res.statusCode = 404;
          return res.end(`No such contact - ${req.params.id}`);
        }

        /*if (!results.changedRows) {
          //res.sendStatus(304);
          res.statusCode = 304;
          return res.end(`No update performed - ${req.params.id}`);
        }*/

		sio.emit("updation", req.params.id);
        res.sendStatus(204);
      });
  })
  .delete((req, res, next) => {
    debug(`delete contact ${req.params.id}`);

    pool.query(
      'DELETE FROM contacts WHERE id = ?', [req.params.id],
      (err, results, fields) => {
        if (err) {
          res.statusCode = 500;
          return res.end('Unable to delete contact');
        }

        console.log(results);
        if (!results.affectedRows) {
          //res.sendStatus(404);
          res.statusCode = 404;
          return res.end(`No such contact - ${req.params.id}`);
        }
		sio.emit("deletion", req.params.id);
        res.sendStatus(204);
      });
  });

module.exports = router;
