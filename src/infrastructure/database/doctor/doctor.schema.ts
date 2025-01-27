import { randomUUID } from "crypto";
import { Schema } from "mongoose";

export const DoctorSchema = new Schema({
    id: { 
        type: String, 
        default: randomUUID(), 
        required: true,
        unique: true 
    },
    phone: { 
        type: String, 
        required: true,
        unique: true 
    },
    firstname: { 
        type: String, 
        required: true 
    },
    lastname: { 
        type: String, 
        required: true 
    },
    spec: { 
        type: String, 
        required: true 
    },
    slots: { 
        type: [Date], 
        default: []
    } 
}, {
    id: true,
    toJSON: {
      transform (doc, ret) {
        ret.id = ret._id
        delete ret._id
      }
    }
}); 