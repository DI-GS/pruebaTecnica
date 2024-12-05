import mongoose from "mongoose";
const { Schema, model } = mongoose;

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false, 
    },
    createdAt: {
        type: Date, 
        default: Date.now, 
        required: true,
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export const Task = mongoose.model("Task", taskSchema);
