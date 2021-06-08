import "./ContactForm.css";

const headers = {
    // "Content-Type": "application/json",
    // 'x-auth-tocken': localStorage.getItem('token')
};

const GetContact = () => {
    function SubmitHandler(e) {
        e.preventDefault();

        let data = new FormData();

        const attachs = e.target[4].files;

        data.append("fullName", e.target[0].value);
        data.append("email", e.target[1].value);
        data.append("phone", e.target[2].value);
        data.append("message", e.target[3].value);

        console.log(typeof attachs);

        /* Because we coudnt send all files into array. We need to appeand each file separetly 
            with  THE SAME KEY.
            For this we have to use "forin" loop becouse typeof varible is object (forEach working only with array) 
        */
        if (attachs.length != 0) {
            for (const single_file of attachs) {
                data.append("attachs", single_file);
            }
        }

        const url = "http://localhost:8080/get-contact"; //?
        const options = {
            method: "POST",
            body: data,
        };

        fetch(url, options).then((data) =>
            data.json().then((output) => {
                if (output.status === "success") {
                    console.log("Congats");
                } else {
                    console.log(output.message);
                }
            })
        );
    }

    return (
        <div id="get-contact">
            <h1>Get Contact</h1>
            <form className="contact-form" onSubmit={SubmitHandler}>
                <input type="text" placeholder="Full Name" />
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Phone" />
                <textarea type="text" placeholder="Message" />
                <input type="file" multiple />
                <button>Get Contact</button>
            </form>
        </div>
    );
};

export default GetContact;
