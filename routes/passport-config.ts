import { PassportStatic } from "passport"
import { authenticateUser } from "../controllers/user"



const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


  async function initialize(passport: PassportStatic, getUserByUsername: any)
{
    const authenticateUser =  async  (username: string, password: string, done: any) => {
         const user =  getUserByUsername(username)

         console.log(user.password)
         console.log(password)
         console.log("deez nut")
        if(user == null)
        {
            return done(null, false, {message: "No user with that username"})
        }

        try{
            if(await bcrypt.compare(new String(password), new String(user.password))) // give up
            {
                return done(null, user)
            } else{
                return done(null,false, {message: "Password incorrect"})
            }
        }catch(e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user, done)=> {})
    passport.deserializeUser((id, done)=> {})



}

module.exports = initialize
