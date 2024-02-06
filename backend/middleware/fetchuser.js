var jwt = require('jsonwebtoken');
const fetchuser = (req , res , next)=>{
const token = req.header('auth-token');
const JWT_SECRET = 'Amrit$inghal';
     if(!token){
         return res.status(401).send({error:"Pls try to authenticate with  correct token"});
     }
     try {
         const data = jwt.verify(token ,JWT_SECRET );
        req.data = data.user;
        
        next();
     } catch (error) {
         return res.status(401).send({error:"Pls try to authenticate with  correct token"});
     }

}



module.exports = fetchuser;