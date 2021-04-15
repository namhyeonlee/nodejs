const nodemailer = require('nodemailer')
const email = {
    host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2a7057440761d6",
    pass: "dfcecc365d0d90"
  }

}

const send = async (option) => {
    nodemailer.createTransport(email).sendMail(option, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(info)
            return info.response
        }
    })
}

let email_data = {
    from: 'zkdn4067@gmail.com',
    to: 'zkdn4067@gmail.com',
    subject: '테스트 메일 입니다.',
    text: 'nodejs 한시간안에 끝내보자'
}

send(email_data)