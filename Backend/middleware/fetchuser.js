var jwt = require('jsonwebtoken');
const JWT_SECRET="saketisag00ddb0y"

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please Authenticate"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next()
        
    } catch (error) {
        res.status(401).send({error:"Please Authenticate"})
    }
    

}
module.exports=fetchuser