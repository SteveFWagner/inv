const crypt = require('bcryptjs')

module.exports={
    register: async (req,res) => {
        try{
            const {email,password} = req.body
            const {session} = req
            console.log(session)
            const db = req.app.get('db')

            let emailCheck = await db.auth.check_users(email)
            emailCheck = emailCheck[0]

            if(emailCheck){
                return res.sendStatus(409)
            }

            let salt = crypt.genSaltSync(10)
            let hash = crypt.hashSync(password, salt)

            let user = await db.auth.register(email,hash)
            user = user[0]
            console.log(user)

            session.user = user
            console.log(session)
            res.status(200).send(session.user)


        }catch(err){
            console.log(err)
        }
    },
    login: async (req,res) => {

    },
    logout: (req,res) => {

    }
}