import express from 'express'
// import { auth, checkAdmin, checkLectAdmin } from '../middleware/auth.js'
import multer from 'multer'
import path from 'path'
import sharp from 'sharp'

const router = new express.Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      return  cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    // storage,
    fileFilter: (req, file,cb)=>{
        const filterTypes = /jpg|jpeg|png/
        const extname = filterTypes.test(path.extname(file.originalname).toLowerCase())
        if (extname) {
           return cb(null, true)
        } else {
          return cb('images only!!!')
        }
    }
})

router.post('/images',upload.single('image'), async (req,res,next)=>{
    try {
      const imageName = `${req.file.fieldname }-${Date.now()}${path.extname(req.file.originalname)}`
      const img = await sharp(req.file.buffer).resize(200, 200).toFile(`uploads/${imageName}`)
      res.send(`/uploads/${imageName}`)
        // res.send(`/${req.file.path}`)
    } catch (error) {
        console.log(error);
        next(error)
    }
       
    })  


export default router

