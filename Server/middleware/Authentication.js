const jwt = require('jsonwebtoken')
const validateToken = (req, res, next) => {
    const accessToken = req.header("Authorization");
  //  console.log(accessToken)
    const token = accessToken && accessToken.split(' ')[1];
    if (!token) return res.json({ error: "User not logged in" });

else{
        const validToken = jwt.verify(token, 'verySecretValue');
        const user = validToken;
        req.user = user;
       
        if (validToken) {
            return next();
        }}

}
module.exports = validateToken;
