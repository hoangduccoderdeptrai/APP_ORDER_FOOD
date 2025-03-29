import express from "express";
import {Blog} from "../../Model/blogSchema.js"
import { Cloudinary } from "../../config/cloundinaryCofig.js";
import multer from "multer";
import streamifier from "streamifier";
import fs from "fs";

//Temporory storage before Cloundinary upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

const blogsRouter = express.Router();
blogsRouter.get('/test',async(req,res)=>{
    try{
        res.status(200).json({msg:"test thành côngcông"})
    }catch(error){
        res.status(500).json({err:error.message})
    }
})

// blogsRouter.post("/ffffffff", upload.array("images", 10), async (req, res) => {
//     try {
//         const files = req.files; // Lấy tất cả file ảnh từ request
//         if (!files || files.length === 0) {
//             return res.status(400).json({ msg: "No files uploaded" });
//         }

//         // Upload tất cả ảnh lên Cloudinary
//         const uploadPromises = files.map((file) =>
//             Cloudinary.uploader.upload(file.path, {
//                 folder: "Item_images"
//             })
//         );

//         // Đợi tất cả ảnh được upload lên Cloudinary
//         const uploadedImages = await Promise.all(uploadPromises);

//         // Tạo danh sách ảnh { url, public_id }
//         const imagesUrl = uploadedImages.map((image) => ({
//             url: image.secure_url,
//             public_id: image.public_id
//         }));

//         // Trả về danh sách ảnh để Froala xử lý
//         res.json({ images: imagesUrl });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
blogsRouter.post("/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Vui lòng chọn một hình ảnh!" });
        }

        console.log("Received file:", req.file); // Debug xem file có được nhận không

        const uploadStream = Cloudinary.uploader.upload_stream(
            { folder: "Item_images" },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    return res.status(500).json({ error: "Lỗi khi upload ảnh lên Cloudinary" });
                }
                console.log("Cloudinary Upload Success:", result);
                res.json({ link: result.secure_url,public_id: result.public_id});
            }
        );

        // Chuyển buffer thành stream để gửi lên Cloudinary
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Lỗi server khi tải ảnh lên Cloudinary" });
    }
});


blogsRouter.post("/blogs",async (req, res) => {
    try {
        const { title, author, content,description} = req.body;
        const link  =JSON.parse(req.body.link)
        console.log(link)
        if (!title || !author || !content || !description) {
          return res.status(400).json({ error: "Thiếu thông tin bài viết!" });
        }
    
        // Trích xuất ảnh từ nội dung bài viết
        // const imageUrls = [];
        // const regex = /<img.*?src=["'](.*?)["']/g;
        // let match;
        // while ((match = regex.exec(content)) !== null) {
        //   imageUrls.push({ url: match[1], public_id: null }); // Không cần public_id khi lấy từ content
        // }
    
        const newBlog = new Blog({ title, author, content,description,imageUrls:link});
        await newBlog.save();
    
        res.status(201).json({ message: "Bài viết đã được đăng!", blog: newBlog });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Lỗi server khi đăng bài" });
    }
});


blogsRouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
blogsRouter.get("/get-all-blogs",async(req,res)=>{
    try{
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs)
    }catch(err){
        res.status(500).json({error:err.message})
    }
    

})
blogsRouter.get("/get-blog/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ error: "Invalid blog ID or server error" });
    }
});
export default blogsRouter;
