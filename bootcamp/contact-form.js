function submitForm() {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let skill = document.getElementById("skill").value;
    let message = document.getElementById("message").value;

    //alert(`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nskill: ${skill}\nMessage: ${message}`);

    let emailTujuan = "D5jg3@example.com";

    let a = document.createElement("a");

    //a.href = `mailto:${emailTujuan}?subject=Contact Form&body=Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nskill: ${skill}.\nMessage: ${message}`;

    a.href = `mailto:${emailTujuan}?subject=${subject}&body=${`Halo, nama saya ${name}. Silahkan hubungi saya di ${email}. Skill saya adalah ${skill}. Berikut yang ingin saya sampaikan: ${message}`}`;

    a.click();
}