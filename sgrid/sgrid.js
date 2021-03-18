import sgMail from '@sendgrid/mail'
const sgrid = (to,from, subject, text, html)=>{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
    to: to, // Change to your recipient
    from: from, // Change to your verified sender
    subject: subject,
    text: `click to rest your school password ${text}`,
    // html: `this is integration test`
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error.response.body)
    })
}

export default sgrid
