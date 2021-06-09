import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';



import Card from "../componets/Card"

function Contacts() {

    const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '' });
    const [contacts, setContacts] = useState([{
        _id: '1',
        fullName: 'test',
        email: 't@t.com',
        phone: '123456',
        address: 'test'
    }
    ]);

    const headers = {
        'Content-Type': 'application/json',
        'x-auth-tocken': localStorage.getItem('token')
    }

    let cards = [];
    
    let history = useHistory();


    const fillForm = (e, field) => {
        let newForm = { ...form };
        newForm[field] = e.target.value;
        setForm(newForm);
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_ROUTE}/contacts/new`;
        const options = {
            method: 'POST',
            headers,
            // mode: "no-cors",  /*  crached my app. Why?? Maybe becouse od post method */
            body: JSON.stringify(form)
        }

        fetch(url, options)
            .then(data => data.json().then(output => setContacts([...contacts, output])));
    }

    useEffect(() => {
        const url = `${process.env.REACT_APP_ROUTE}/contacts/all`;
        const options = {
            mode: 'cors',
            headers
        }

        fetch(url, options).then(data => data.json().then(output => {
            if (output.status == 'success') {
                setContacts(output.data);
            } else {
                // alert('Failed. Check console')
                console.log(output);
            }            
        }));
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/auth')
        }
    },);

    const deleteContactHandler = (id) => {
        const url = `${process.env.REACT_APP_ROUTE}/contacts/delete/` + id;
        const options = {
            method: 'DELETE',
            headers
        }

        console.log(url);

        fetch(url, options)
            .then(response => response.json().then(output => {
                if (output.status === 'success') {
                    // alert(output.message);
                    let newList = contacts.filter(contact => {
                        if (contact._id != output.data) {
                            return contact;
                        }
                    });
                    setContacts(newList);
                } else {
                    alert(`There's an error. For details please check the console.`);
                    console.log(output.message);
                }
            }))
            .catch(err => { alert(err) });
    }


    if (typeof (contacts) == 'object' && contacts.length > 0) {
        cards = contacts.map(contact => <Card
            key={contact['_id']}
            contact={contact}
            deleteContact={deleteContactHandler.bind(this, contact['_id'])}
        />)
    }


    /* console.log(cards, contacts) */
    return (
        <div className="App">
            <form className="form" onSubmit={formSubmitHandler}>
                <input required placeholder="Full name" value={form.fullName} onChange={(e) => fillForm(e, 'fullName')} />
                <input type="email" placeholder="Email" value={form.email} onChange={(e) => fillForm(e, 'email')} />
                <input type="tel" placeholder="Phone number" value={form.phone} onChange={(e) => fillForm(e, 'phone')} />
                <input placeholder="Address" value={form.address} onChange={(e) => fillForm(e, 'address')} />
                <button>Create Contact</button>
            </form>

            <section className="contact-list">
                {cards}
            </section>
        </div>
    );
}

export default Contacts;
