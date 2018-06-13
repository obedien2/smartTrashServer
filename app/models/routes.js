
var AuthenticationController = require('../controllers/authentication'),
    BinController = require('../controllers/bin')
    express = require('express'),
    passportService = require('../../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt',{session: false}),
requireLogin = passport.authenticate('local',{session: false});



module.exports = function(app){
    
            var apiRoutes = express.Router(),
                authRoutes = express.Router(),
                binRoutes = express.Router();
    
                
            //Auth Routes
            apiRoutes.use('/auth', authRoutes);
    
            authRoutes.post('/register', AuthenticationController.register);
            authRoutes.post('/login', requireLogin, AuthenticationController.login);
    
            authRoutes.get('/protected', requireAuth, function(req, res){
                res.send({content: 'Success'});
            });

            //Bin Routes
            apiRoutes.use('/bins',binRoutes);

            binRoutes.get('/',requireAuth,AuthenticationController.roleAuthorization(['admin','trucker']),BinController.getBins);
            binRoutes.post('/', requireAuth, BinController.createBin);
           // binRoutes.delete('/:bin_id', requireAuth,AuthenticationController.roleAuthorization(['admin']), BinController.deleteBin);
    
         
            // Set up routes
            app.use('/api', apiRoutes);
        
        }