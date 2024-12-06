import mongoose from "mongoose";
const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    
    },
    frequency: {
      type: Number,
      default :0
    },
  },
  { timestamps: true }
);

// Automatically update `updatedAt` on save
newsSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const NewsModel = mongoose.model("News", newsSchema);
