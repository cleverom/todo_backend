import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    todo: String,
    dueDate: String,
    status: {
        type: String,
        enum: ['done', 'undone'],
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});


export default mongoose.model("todo", TodoSchema);