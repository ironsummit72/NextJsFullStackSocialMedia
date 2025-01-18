import multer from 'multer'
import fs from 'node:fs'
import path from 'node:path'
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		if (fs.existsSync('./uploads')) {
			cb(null, './uploads')
		} else {
			fs.mkdir('./uploads', (err) => {
				if (err) {
					console.error(err)
				}
				console.log('directory created successfully')
				cb(null, './uploads')
			})
		}
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
	},
})

const upload = multer({storage: storage})
export default upload
