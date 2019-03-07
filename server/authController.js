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
        try{
            const db = req.app.get('db')
            const {session} = req
            const {email, password} = req.body

            let user = await db.auth.login(email)
            user = user[0]
            
            if(!user){
                return res.sendStatus(404)
            }

            let authed = crypt.compareSync(password,user.password)
            if(authed){
                delete user.password
                session.user = user
                res.status(200).send(session.user)
            }else {
                res.sendStatus(401)
            }
            
        }catch(err){
            console.log(err)
        }
    },
    logout: (req,res) => {
        console.log(req.session)
        req.session.destroy(function(){
            res.sendStatus(200)
        })
    },
    userCheck: (req,res) => {
        const {user} = req.session
        if(user){
            res.status(200).send(user)
        }else{
            res.sendStatus(401)
        }
    }
}