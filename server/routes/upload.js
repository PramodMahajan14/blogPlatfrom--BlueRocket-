const router = require('express').Router()

const uploadImage = require('../middleware/uploadImage')
const uploadCtrl = require('../controllers/uploadCtr')
const uploadimage2 = require('../middleware/uploadimage2')
const uploadCtrl2 = require('../controllers/uploadCtr2')
const auth = require('../middleware/auth')


router.post('/upload_avatar',uploadImage,auth,uploadCtrl.uploadAvatar);

router.post('/upload_image',uploadimage2,auth,uploadCtrl2.uploadImage);

module.exports = router