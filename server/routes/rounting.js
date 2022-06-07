const router = require('express').Router();
require("../models/Usermodel")
const userctrl = require('../controllers/userconnection')
const auth = require('../middleware/auth')

router.post('/register',userctrl.register);

router.post('/activation',userctrl.activateEmail);

router.post('/login',userctrl.login);

router.post('/refresh_token',userctrl.getAccessToken);

router.post('/forgot',userctrl.forgotpassword);

router.post('/reset',auth,userctrl.resetpassword);

 router.get('/profile',userctrl.getalluserdetail);
// router.get('/profile',userctrl. getalluserdetail);

router.get('/myprofile',auth,userctrl.getuserdetail);

router.patch('/update',userctrl.updateuser)

router.get('/logout',userctrl.logout);

router.post('/google_login',userctrl.googleLogin);

router.post('/create_post',userctrl.createpost);
router.post('/update_post',userctrl.updatepost);
router.get('/getpost',userctrl.allpost);
router.post('/post_like',userctrl.LikeAction)
router.post('/delete_post',userctrl.deletepost)




module.exports = router;