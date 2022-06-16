export const SendEmail = ({from, to, link}) => {
    console.log(to);
    window.Email.send({
        // SecureToken: process.env.REACT_APP_EMAIL_SECURE_TOKEN,
        Host: "smtp.elasticemail.com",
        Username: "brishenzhou@qq.com",
        Password: "863A38E7B7F18A2F054E2598DB023178B1DF",
        To: to,
        From: from,
        Subject: "IPFS File Download",
        Body: "File download address is " + link
    })
    .then(
        message => alert(message)
    );
};