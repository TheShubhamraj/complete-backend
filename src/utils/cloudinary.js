import {v2 as cloudinary} from "cloudinary"

import fs from 'fs'

cloudinary.config({ 
cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (loacalFilePath) =>{
    try {
        if (!loacalFilePath) {
            return null
        }
        // upload the file on cloudinary
    const response=  await cloudinary.uploader.upload(loacalFilePath,{
           resource_type:"auto" 
        })
        // file has been successfully uploaded

        console.log("file is uploaded on cloudinary ",response.url);
        fs.unlinkSync(loacalFilePath);

        return response;
        

    } catch (error) {
        fs.unlinkSync(loacalFilePath)// remove the locally saved temporary file as the upload operation got failded
        return null;
    }
}




export {uploadOnCloudinary}