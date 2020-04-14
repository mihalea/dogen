import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import fileDownload from 'js-file-download'
import axios from 'axios';
import dateformat from 'dateformat';

const reasons = [
    "1. interes profesional",
    "2. asigurarea de bunuri care acoperă necesitățile de bază ale persoanelor și animalelor de companie",
    "3. asistență medicală care nu poate fi amânată și nici realizată de la distanță",
    "4. motive justificate, precum asistența persoanelor vârstnice, bolnave",
    "5. activitate fizică individuală sau pentru nevoile animalelor de companie/domestice",
    "6. realizarea de activități agricole",
    "7. donarea de sânge",
    "8. scopuri umanitare sau de voluntariat",
    "9. comercializarea de produse agroalimentare",
    "10. asigurarea de bunuri necesare desfășurării activității profesionale"
];

class FillForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            name: "Alege..",
            reasons: new Set(),
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("download");

        let formData = {
            location: this.state.location,
            name: this.state.name.toLowerCase(),
            reasons: Array.from(this.state.reasons).join(" ")
        }

        let fileName = `${formData.name}_${dateformat(new Date(), "dd-mm")}.pdf`;

        axios.request({
            url: "http://localhost:3000/api/document/",
            method: "POST",
            responseType: 'blob', //important
            data: formData
        }).then(res => {
            console.log("success");
            fileDownload(res.data, fileName);
        }).catch(err => {
            console.log(err);
        });

        ;

        // axios.post("http://localhost:3000/api/document/", )
    }

    handleTextChange(event) {
        let fieldName = event.target.id;
        let fleldVal = event.target.value;
        this.setState({
            [fieldName]: fleldVal
        });
    }

    handleCheckboxChange(event) {
        let checkboxId = event.target.id;
        if (this.state.reasons.has(checkboxId)) {
            this.state.reasons.delete(checkboxId);
        } else {
            this.state.reasons.add(checkboxId);
        }
    }

    createCheckboxes() {
        return (
            reasons.map((r, idx) => (
                <Form.Check
                    type={'checkbox'}
                    label={`${r}`}
                    id={`Group${idx + 1}`}
                    key={`reason-${idx}`}
                    size='lg'
                    onChange={this.handleCheckboxChange.bind(this)}
                />
            )));
    }

    render() {
        return (
            <div className="container">
                <div className="py-5 text-center">
                    <h2 className="text-center">Please, COVID!</h2>
                </div>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Nume</Form.Label>
                        <Form.Control as="select" value={this.state.name} onChange={this.handleTextChange.bind(this)}>
                            <option disabled>Alege..</option>
                            <option>Mircea</option>
                            <option>Stefan</option>
                            <option>Daniela</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="location">
                        <Form.Label>Locul deplasarii</Form.Label>
                        <Form.Control type="text" onChange={this.handleTextChange.bind(this)}
                            placeholder="Introduceti locul" />
                    </Form.Group>

                    <Form.Group controlId="reason">
                        <Form.Label>Motivul deplasarii</Form.Label>
                        {this.createCheckboxes()}

                    </Form.Group>

                    <Button variant="primary" size="lg" block type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default FillForm;