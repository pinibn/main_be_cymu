const express = require("express");
const router = new express.Router;

const emailController = require('../controllers/email.controller');

router.post('/postEmail', (req, res) => {
    console.log('New email arrived...')
    emailController.addEmail(req, res);
})

router.get('/getEmails', (req, res) => {
    console.log('Returning all emails...')
    emailController.getEmails(req, res);   
})

module.exports = router;