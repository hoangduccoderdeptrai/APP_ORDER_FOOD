// Import fs
import fs from "fs";

const deleteTempFiles = (files) => {
    files.forEach((file) => {
        fs.unlink(file.path, (err) => {
            if (err) console.log("Failed to delete file", file.path, err.message);
        });
    });
};

// Export deleteTempFiles
export { deleteTempFiles };