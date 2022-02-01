const gotAgent = require('got');

//internal imports
const config = require('../../config/default');
const Email = require('../models/email.model');


exports.addEmail = (req, res) => {
    const e_addr = req.body.email_address; // in case of 'email_address' is undefined, the schema will reject the insertion (field is mandatory)
    const e_subject = req.body.email_subject; // in case of 'email_content' is undefined, the schema will reject the insertion (field is mandatory)
    const e_cntnt = req.body.email_content; // in case of 'email_content' is undefined, the schema will reject the insertion (field is mandatory)

    let emailInstance = new Email({
        address: e_addr,
        subject: e_subject,
        content: e_cntnt
    });
    emailInstance.save() // mongoose save function
    .then(async (result) => {
        console.log('Email Added successfully !');
        //after adding the email to DB, dispatch a request to email manager service and deliver the email to be sent
        const { statusCode } = await gotAgent.post(config.emailman.url, {
            form: {
                email_address:  e_addr,
                email_subject: e_subject,
                email_content: e_cntnt
            }
        });

        res.sendStatus(statusCode);

    }).catch(err => {
        console.log('Failure - Email was not added ! : ', err);
        res.status(500).send('Fail to Add Email!');
    })
}

exports.getEmails = (req, res) => {
    Email.find() // find without a parameter will return all the documents in the collection 
    .then(emails => {
        console.log('All emails: ', emails);
        res.status(200).send(emails.toString());
    })
    .catch(err => {
        console.log('Error while trying to get all emails: ', err);
        res.status(500).send('error read all email from db');
    });
}