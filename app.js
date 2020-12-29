const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/api' , (req, res) => {
    res.json({
        message:'welcome'
    });
    
});

app.post('/api/posts/', verifyToken,(req ,res ) => {
    jwt.verify(req.token, 'secretkey', (err,authData) => {
        if(err){
            res.sendStatus(400);
        }else{
            res.json({
                message: 'post created',
                authData
            });
           
        }
    });
    
});

app.post('/api/login', (req, res) => {
    //mock user created
    const user = [ 
    {
        user: 'heman',
        email: 'heman@gmail.com'
    },
    {
        user: 'nidhi',
        email: 'nidhi@gmail.com'
    }
]
    jwt.sign({user} , 'secretkey',{expiresIn : '40sec'}, (err, token) => {
        if(err){
            res.json({message: err.message});
        }else{  
            res.json({
                token
            });
        }
    });
    
});

//format of token
//Authorization : heman <acessstoken>

function verifyToken(req, res ,next){
    const hemanHeader = req.headers['authorization'];
    
    //check type
    if(typeof hemanHeader !== 'undefined'){

        const heman = hemanHeader.split(' ');
        const hemanToken = heman[1];
        req.token = hemanToken;

        next();
        
    }else{
        res.status(403).json({message: err.message})
    }

}
app.listen(9000, () => console.log('server started at ${3000} ' ));







