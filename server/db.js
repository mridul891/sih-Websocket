import mongoose from "mongoose";
const newsSchema = new mongoose.Schema(
  {
    news: {
      type: String,
      required: true,
    },
    disasterType: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    date:{
      type:String,
    },
    desc: {
      type: String,
    },
    location: {
      type: String,
    },
    latest:{
      type :Boolean
    }
  }
);
export const NewsModel = mongoose.model("News", newsSchema);
