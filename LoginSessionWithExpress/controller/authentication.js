var bcrypt = require('bcrypt');
const{userModel} = require('../model/userModel');
const createUser = function(user) {
    
    return new Promise((resolve, reject)=>{
            const newUser = new userModel({
                email:user.email,
                password:bcrypt.hashSync(user.password, 8) 
            })
            newUser.save()
                .then((res)=>{
                    resolve(res);
                }).catch((err)=>{
                    reject("Found an account with same email address");
            })
            
        })
}
module.exports.createUser = createUser;
const verifyUser = function(user, callback) {
    
    userModel.findOne({
        email:user.email
    },(err, userdb)=>{
        if(err){
            callback(err)
        }else{
            if(userdb) {
                
                const isPasswordMatch = bcrypt.compareSync(user.password, userdb.password);
                if(isPasswordMatch) {
                    callback(null, userdb);
                }else{
                    callback('Please verify the credentials provided!');
                }
            }else{
                callback('User not found. Please sign up!');
            }
        }
    })
}
module.exports.verifyUser = verifyUser;
