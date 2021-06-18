const USER_EMAIL = 'kareem.afify.95@gmail.com'
$(() => {
    $("#submit-button").on('click', function () {
        const formData = $('#form-contact').serializeArray();
        const keys = {
            name: 'name',
            email: 'email',
            message: 'message'
        };
        let subject = '';
        let email = '';
        let body = '';
        console.log('formData', formData)

        for (let fd of formData) {
            if (fd.name === keys.name && fd.value) {
                subject = `Contact : ${fd.value}`
            } 
            if (fd.name === keys.email) {
                email = fd.value;
            } 
            if (fd.name === keys.message) {
                body = fd.value;
            } 
        }
        console.log(subject , email , body)
        console.log(!subject || !email || !body)

        if (!subject || !email || !body) {
            alert("Please fill all form field");
            return;
        }
        window.open(`mailto:${USER_EMAIL}?subject=${subject}&to=${email}&body=${body}`)
    });
    $("#subscribe-button").on('click', function () {
        const formData = $('#form-subscribe').serializeArray();
        const keys = {
            email: 'email',
        };
        let subject = 'subscribe';
        let email = '';
        for (let fd of formData) {
            if (fd.name === keys.email) {
                email = fd.value;
            } 
        }
        if (!email) {
            alert("please add you email");
            return;
        }
        window.open(`mailto:${USER_EMAIL}?subject=${subject}&to=${email}`)
    });
});
