import './ContactForm.css';

const headers = {
    'Content-Type': 'application/json',
    // 'x-auth-tocken': localStorage.getItem('token')
}



const GetContact = () => {

    function SubmitHandler(e) {
        e.preventDefault();

        let data = {};

        data.fullName = e.target[0].value
        data.email = e.target[1].value
        data.phone = e.target[2].value
        data.message = e.target[3].value



        const url = 'http://localhost:8080/get-contact'; //?
        const options = {
            method: 'POST',
            headers,
            // mode: "no-cors",  /*  crached my app. Why?? Maybe becouse od post method */
            body: JSON.stringify(data)
        }

        fetch(url, options)
            .then(data => data.json().then(output => {
                if (output.status === 'success') {
                    console.log('Congats');
                } else {
                    console.log(output.message);
                }

            }));
    }



    return (
        <div id="get-contact">
            <h1>Get Contact</h1>
            <form className="contact-form" onSubmit={SubmitHandler}>
                <input type='text' placeholder="Full Name" />
                <input type='email' placeholder="Email" />
                <input type='text' placeholder="Phone" />
                <textarea type='text' placeholder="Message" />
                <button>Get Contact</button>
            </form>
        </div>
    );
}

export default GetContact;
