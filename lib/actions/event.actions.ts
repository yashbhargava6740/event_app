"use server"
import { CreateEventParams, DeleteEventParams, GetAllEventsParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import Event from "../database/models/event.model"
import Category from "../database/models/category.model"
import { revalidatePath } from "next/cache"

const populateEvent = async(query:any) => {
    return query.populate({ path: 'organizer', model: User, select: '_id firstName lastName'})
    .populate({ path: 'category', model: Category, select: '_id name'});
}

export const createEvent = async ({ event, userId, path } : CreateEventParams) => {
    try {
        await connectToDatabase();
        // console.log(userId);
        const organizer = await User.findById(userId);
        // console.log(organizer);
        if(!organizer) {
            throw new Error("Organizer Not Found!");
        } else {
            const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: userId});
            return JSON.parse(JSON.stringify(newEvent));
        }
    } catch (error) {
        handleError(error);
    }
} 

export const getEventById = async(eventId:string) => {
    try {
        await connectToDatabase();
        const event = await populateEvent(Event.findById(eventId));
        if(!event) {
            throw new Error("Event Not Found");
        }
        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        console.log(error);
    }
}

export const getAllEvents = async({ query, limit = 6, page, category } : GetAllEventsParams) => {
    try {
        await connectToDatabase();
        const conditions = {};
        const eventsQuery = Event.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(0)
        .limit(limit);

        const events = await populateEvent(eventsQuery);
        const events_count = await Event.countDocuments(conditions);
        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(events_count / limit),
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteEvent = async({eventId, path} : DeleteEventParams) => {
    try {
        await connectToDatabase();
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if(deletedEvent) {
            // This will clear the cache and reload the events 
            revalidatePath(path); 
        }
    } catch (error) {
        console.log(error);
    }
}