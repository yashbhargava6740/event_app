import { Document } from "mongodb";
import { Schema, model, models } from "mongoose";

export interface IEvent extends Document {
    _id: string,
    title: string;
    description?: string;
    location?: string;
    createdAt: Date;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price?: string;
    isFree: boolean;
    url?: string;
    category?: { _id: string, name: string } 
    organizer?: { _id: string, firstName: string, lastName: string } 
}
// Above interface will help me to know which fields i actually have in my model

const EventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    imageUrl: {
        type: String,
        required: true,
    },
    startDateTime: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    endDateTime: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    price: {
        type: String,
    },
    isFree:{
        type: Boolean,
        required: true,
        default:false,
    },
    url: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Event = models.Event || model('Event', EventSchema);
export default Event;