// Import review model
import { Review } from "../../Model/review.model.js";

// Post comment in restaurant
const createComment = async (req, res) => {
    try {
        // Get data comment from request
        const accountId = req.payload.sub;
        const { restaurantId, rating, reviewText } = req.body;

        // Check if comment exists
        if (!restaurantId || !rating) {
            return res.status(200).json({ msg: "Please enter all fields" });
        }

        // Create comment
        const comment = new Review({
            accountId,
            restaurantId,
            rating,
            reviewText,
        });

        // Save comment
        await comment.save();

        // Return json
        res.status(200).json({ msg: "Comment created" });
    } catch (error) {
        // Return error
        res.status(500).json({ msg: error.message });
    }
};

// Edit comment in restaurant
const editComment = async (req, res) => {
    try {
        // Get data comment from request
        const accountId = req.payload.sub;
        const { restaurantId, rating, reviewText, idComment } = req.body;

        // Check if comment exists
        if (!restaurantId || !rating) {
            return res.status(200).json({ msg: "Please enter all fields" });
        }

        // Find comment
        const comment = await Review.findOne({ _id: idComment, restaurantId: restaurantId });

        // Check if comment exists
        if (!comment) {
            return res.status(200).json({ msg: "Comment not found" });
        }

        // Check if comment is belong to user
        if (comment.accountId.toString() !== accountId) {
            return res.status(200).json({ msg: "You can't edit this comment" });
        }

        // Update comment
        await Review.updateOne({ _id: idComment }, { rating, reviewText, updatedAt: Date.now() });

        // Return json
        res.status(200).json({ msg: "Comment updated" });
    } catch (error) {
        // Return error
        res.status(500).json({ msg: error.message });
    }
};

// Delete comment in restaurant
const deleteComment = async (req, res) => {
    try {
        // Get data comment from request
        const accountId = req.payload.sub;
        const { restaurantId, idComment } = req.body;

        // Find comment
        const comment = await Review.findOne({ _id: idComment, restaurantId: restaurantId });

        // Check if comment exists
        if (!comment) {
            return res.status(200).json({ msg: "Comment not found" });
        }

        // Check if comment is belong to user
        if (comment.accountId.toString() !== accountId) {
            return res.status(200).json({ msg: "You can't delete this comment" });
        }

        // Delete comment
        await Review.deleteOne({ _id: idComment });

        // Return json
        res.status(200).json({ msg: "Comment deleted" });
    } catch (error) {
        // Return error
        res.status(500).json({ msg: error.message });
    }
};

export { createComment, editComment, deleteComment };
