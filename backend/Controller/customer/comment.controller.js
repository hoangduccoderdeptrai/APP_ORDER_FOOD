// Import model
import { Review } from "../../Model/review.model.js";
import { Restaurant } from "../../Model/restaurant.model.js";

// Post comment in restaurant
const createComment = async (req, res) => {
    try {
        // Get data comment from request
        const accountId = req.user.userId;
        const { restaurantId, rating, reviewText } = req.body;

        // Check if comment exists
        if (!restaurantId || !reviewText) {
            return res.status(200).json({ msg: "Please enter importance fields" });
        }

        // Find restaurant by id
        const restaurant = await Restaurant.findBy({
            _id: restaurantId,
            status: "active",
        });

        // Check if restaurant exists
        if (!restaurant) {
            return res.status(404).json({ msg: "Restaurant not found" });
        }

        // Check if rating is valid
        if (rating) {
            try {
                rating = parseInt(rating);
            } catch (error) {
                return res.status(200).json({ msg: "Rating must be a number" });
            }
            if (rating < 1 || rating > 5) {
                return res.status(200).json({ msg: "Rating must be between 1 and 5" });
            }

            // Update startMedium of restaurant
            restaurant.starMedium =
                (restaurant.starMedium * restaurant.review + rating) / (restaurant.review + 1);
            restaurant.review += 1;

            // Save restaurant
            await restaurant.save();
        }

        // Create comment
        const comment = new Review({
            accountId,
            restaurantId,
            rating: rating || 0,
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
        const accountId = req.user.userId;
        const { restaurantId, rating, reviewText, idComment } = req.body;

        // Check if comment exists
        if (!restaurantId || !reviewText || !idComment) {
            return res.status(200).json({ msg: "Please enter importance fields" });
        }

        // Find comment
        const comment = await Review.findOne({
            _id: idComment,
            restaurantId: restaurantId,
            accountId: accountId,
        });

        // Check if comment exists
        if (!comment) {
            return res.status(200).json({ msg: "Comment not found" });
        }

        // Update comment
        await Review.findByIdAndUpdate(idComment, { rating: rating, reviewText: reviewText });

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
        const accountId = req.user.userId;
        const { restaurantId, idComment } = req.body;

        // Find comment
        const comment = await Review.findOne({
            _id: idComment,
            restaurantId: restaurantId,
            accountId: accountId,
        });

        // Check if comment exists
        if (!comment) {
            return res.status(200).json({ msg: "Comment not found" });
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
