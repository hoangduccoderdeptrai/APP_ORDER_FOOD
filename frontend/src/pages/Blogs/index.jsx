import React, { useState } from "react";

import axios from "axios";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/code_beautifier.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/draggable.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/entities.min.js";
import "froala-editor/js/plugins/file.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/fullscreen.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/image_manager.min.js";
import "froala-editor/js/plugins/inline_class.min.js";
import "froala-editor/js/plugins/inline_style.min.js";
import "froala-editor/js/plugins/line_breaker.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/quote.min.js";
import "froala-editor/js/plugins/save.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/url.min.js";
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/js/plugins/word_paste.min.js";

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const  [uploadImages,setUploadImages] =useState([])
    const [description,setDescripttion] =useState("");
    const [uploading, setUploading] = useState(false);
    const config = {
        placeholderText: "Nhập nội dung...",
        heightMin: 250,
        heightMax: 400,
        toolbarButtons: [
          "bold", "italic", "underline", "strikeThrough", "|",
          "fontFamily", "fontSize", "color", "inlineStyle", "paragraphStyle", "|",
          "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent", "|",
          "insertLink", "insertImage", "insertVideo", "insertTable", "|",
          "quote", "code", "specialCharacters", "emoticons", "|",
          "html", "fullscreen"
        ],
        paragraphFormat: {
          H1: "Heading 1",
          H2: "Heading 2",
          H3: "Heading 3",
          H4: "Heading 4",
          BLOCKQUOTE: "Blockquote",
          PRE: "Preformatted",
          DIV: "Div",
          SPAN: "Span"
      
        },
        enter: FroalaEditor.ENTER_P, // Đảm bảo Enter tạo <p> đúng chuẩn
        htmlAllowedTags: ["p", "span", "div", "b", "i", "u", "a", "img", "br", "strong", "em"],
        htmlAllowedAttrs: ["href", "src", "alt", "style", "class"],
        htmlDoNotWrapTags: ["span"], // Không tự động bọc <span> vào <p>
        imageUploadURL: "http://localhost:3000/admin/api/upload",
        imageUploadParam: "image",
        imageUploadMethod: "POST",
        imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
        imageMaxSize: 10 * 1024 * 1024, // Giới hạn ảnh 5MB
        charCounterCount: true,
          events: {
              "image.uploaded": function (response) {
              const data = JSON.parse(response); // Chuyển response về object
              if (data.link && data.public_id) {
                  setUploadImages(prev => [...prev, { url: data.link, public_id: data.public_id }]);
              }
              }
          }
    };
      

    // Khi thay đổi nội dung Froala
    const handleModelChange = (model) => {
        setContent(model);
    };

    // Xử lý chọn nhiều ảnh & tạo URL preview
  

    // Xử lý gửi bài viết
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("content", content);
        formData.append("description",description)
        formData.append("link", JSON.stringify(uploadImages));
        console.log(uploadImages)
        // Thêm từng file vào formData
       

        try {
            const response = await axios.post("http://localhost:3000/admin/api/blogs", formData, {
                headers: { "Content-Type": "application/json" },
                
            });

            alert("Bài viết đã được đăng thành công!");

            // Reset form
            setTitle("");
            setAuthor("");
            setContent("");
            setUploadImages([])
            setDescripttion("")
           
        } catch (error) {
            console.error("Lỗi khi đăng bài:", error);
            alert("Có lỗi xảy ra!");
        } finally {
            setUploading(false);
        }
    };
    const cleanContent =content.replace(/<\/?undefined>/g, "")

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-center text-2xl font-semibold mb-4">Đăng Bài Blog</h2>
            <form onSubmit={handleSubmit}>
                {/* Tiêu đề */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Tiêu đề:</label>
                    <input 
                        type="text"
                        className="w-full border rounded-lg p-2"
                        placeholder="Nhập tiêu đề..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required 
                    />
                </div>

                {/* Tác giả */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Tác giả:</label>
                    <input 
                        type="text"
                        className="w-full border rounded-lg p-2"
                        placeholder="Nhập tên tác giả..."
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required 
                    />
                </div>
                {/* Mô tả */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Mô tả:</label>
                    <textarea 
                        type="text"
                        className="w-full border rounded-lg p-2"
                        placeholder="Nhập tên tác giả..."
                        value={description}
                        onChange={(e) => setDescripttion(e.target.value)}
                        required 
                    />
                </div>

                {/* Nội dung */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Nội dung:</label>
                    <FroalaEditor tag="textarea" model={cleanContent} onModelChange={(newContent) => setContent(newContent)} config={config}  />
                </div>

                {/* Upload nhiều ảnh
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Chọn ảnh:</label>
                    <input 
                        type="file"
                        multiple
                        className="w-full border rounded-lg p-2"
                        onChange={handleImageChange}
                    />
                </div>

                {/* Hiển thị ảnh preview */}
                {/* <div className="mb-4 flex flex-wrap gap-3">
                    {previewImages.map((src, index) => (
                        <img key={index} src={src} alt="preview" className="w-24 h-24 object-cover rounded-lg shadow" />
                    ))}
                </div> */} 

                {/* Nút đăng bài */}
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg text-lg hover:bg-green-600 transition" disabled={uploading}>
                    {uploading ? "Đang tải ảnh..." : "Đăng bài"}
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;