import { version } from '../../package.json';
import { Router } from 'express';

var pdftk = require('node-pdftk');
var crypto = require("crypto");
var dateformat = require("dateformat")


export default ({ config, db }) => {
    let api = Router();

    api.post('/', function (req, res) {
        console.log('Generating document for body:', req.body);

        let name = req.body.name;
        let location = req.body.location;
        let reasons = req.body.reasons;

        var today = new Date();

        var formData = {
            deplasare: location,
            data: dateformat(today, "dd/mm/yyyy")
        }

        reasons.split(" ").forEach(reason => {
            formData[reason] = "Choice1";
        })

        pdftk
            .input(`input/${name}.pdf`)
            .fillForm(formData)
            .flatten()
            .output()
            .then(buffer => {
                res.send(buffer);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })

    return api;
}
