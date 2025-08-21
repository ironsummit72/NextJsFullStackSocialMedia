import { Response, Request } from "express";
import ApiResponse from "../utils/ApiResponse.util";
import path from "path";
import { stat, createReadStream } from "fs";

export async function streamContent(req: Request, res: Response) {
    const { filename, dir } = req.params;
    if (filename && dir) {
        if(dir==='video')
        {
            const filePath = path.join(__dirname, '..', '..', 'uploads', 'posts', dir, filename);
            stat(filePath, (err, stats) => {
                if (err) {
                    console.error(err);
                }
                const range = req.headers.range;
                if (!range) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    return res.end('Requires Range header');
                }
                const CHUNK_SIZE = 10 ** 6; // 1MB chunk size
                const start =  Number(range.replace(/\D/g, ""));
                const end = Math.min(start + CHUNK_SIZE, stats.size - 1);
    
                const contentLength = end - start + 1;
                res.writeHead(206, {
                    'Content-Range': `bytes ${start}-${end}/${stats.size}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': contentLength,
                    'Content-Type': 'video/mp4',
                });
                const fileStream = createReadStream(filePath, { start, end });
                fileStream.pipe(res);
            })
            
        }else {
            const filePath = path.join(__dirname, '..', '..', 'uploads', 'posts', dir, filename);
            stat(filePath, (err, stats) => {
                if (err) {
                    console.error(err);
                }
                res.writeHead(206, {
                    'Accept-Ranges': 'bytes',
                    'Content-Type': 'image/jpeg',
                });
                const fileStream = createReadStream(filePath);
                fileStream.pipe(res);
            })
        }  
    } else {
        const response: ApiResponse = { data: null, message: 'either filename or dir is missing', redirect: null, statusCode: 400, statusMessage: 'failed', success: false }
        res.status(400).json(response)
    }
}
export async function streamContentForStories(req: Request, res: Response) {
    const { filename, dir } = req.params;
    if (filename && dir) {
       try {
         if(dir==='video')
        {
            const filePath = path.join(__dirname, '..','..', 'uploads','story',dir, filename);
            stat(filePath, (err, stats) => {
                if (err) {
                    console.error(err);
                }
                const range = req.headers.range;
                if (!range) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    return res.end('Requires Range header');
                }
                const CHUNK_SIZE = 10 ** 6; // 1MB chunk size
                const start =  Number(range.replace(/\D/g, ""));
                const end = Math.min(start + CHUNK_SIZE, stats.size - 1);
    
                const contentLength = end - start + 1;
                res.writeHead(206, {
                    'Content-Range': `bytes ${start}-${end}/${stats.size}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': contentLength,
                    'Content-Type': 'video/mp4',
                });
                const fileStream = createReadStream(filePath, { start, end });
                fileStream.pipe(res);
            })
            
        }else {
            const filePath = path.join(__dirname, '..', '..', 'uploads', 'story',dir, filename);
            stat(filePath, (err, stats) => {
                if (err) {
                    console.error(err);
                }
                res.writeHead(206, {
                    'Accept-Ranges': 'bytes',
                    'Content-Type': 'image/jpeg',
                });
                const fileStream = createReadStream(filePath);
                fileStream.pipe(res);
            })
        }  
        
       } catch (error) {
        console.error(error);
        const response:ApiResponse={data:null,message:error,redirect:null,statusCode:500,statusMessage:'error',success:false}
        res.status(response.statusCode).json(response)
       }
    } else {
        const response: ApiResponse = { data: null, message: 'either filename or dir is missing', redirect: null, statusCode: 400, statusMessage: 'failed', success: false }
        res.status(400).json(response)
    }
}