export const SendEmail = ({to, link}) => {
    console.log(to);
    window.Email.send({
        // SecureToken: process.env.REACT_APP_EMAIL_SECURE_TOKEN,
        Host: process.env.REACT_APP_EMAIL_HOST,
        Username: process.env.REACT_APP_EMAIL_USERNAME,
        Password: process.env.REACT_APP_EMAIL_PASSWORD,
        To: to,
        From: "brishenzhou@vip.qq.com",
        Subject: "IPFS File Download",
        Body: "File download address is " + link
    })
    .then(
        message => alert(message)
    );
};
