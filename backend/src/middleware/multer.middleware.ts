import multer from 'multer'
import fs from 'node:fs'
import path from 'node:path'
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		if (fs.existsSync(`./uploads/${file?.fieldname}/${file.mimetype.split('/')[0]}`)) {
			cb(null, `./uploads/${file?.fieldname}/${file.mimetype.split('/')[0]}`)
		} else {
			fs.mkdir(`./uploads/${file?.fieldname}/${file.mimetype.split('/')[0]}`,{recursive:true}, (err) => {
				if (err) {
					console.error(err)
				}
				console.log('directory created successfully')
				cb(null, `./uploads/${file?.fieldname}/${file.mimetype.split('/')[0]}`)
			})
		}
	},
	filename: function (req, file, cb) {
		if(file.fieldname==='displaypicture')
		{
           const uniqueSuffix=req.user?.username
		   cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
		}else{
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
			cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
		}
		
	},
})

const upload = multer({ storage: storage })
export default upload
