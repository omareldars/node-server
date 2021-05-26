const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = async function(req, res, next){
    console.log(req.user);
    if(req.user.username == "adminlte"){
        // const validatePassword = await bcrypt.compareSync(req.user.password, "$2a$08$a5N7fVJJQjGTFqAohTRk6uC.h8EeBZX1UCvnRl.vT8JCSN2I4PeVC");
        if(req.user.password == "$2a$08$xGaFxNF6EsKv.dld6qUqmebqWV8JMLXT71REqgkMeGIs2AYYcGuaS") {
            next();
            console.log("pass");
        } else{
            console.log("validatePassword");
            return res.status(403).send("Access deniedddddddd");

        }
       
    } else {
        console.log("reject2");

        return res.status(403).send("Access denied");
    }
}
