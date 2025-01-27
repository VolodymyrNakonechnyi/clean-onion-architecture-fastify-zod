import { randomUUID } from "crypto";
import { Schema } from "mongoose";


export const AppointmentSchema = new Schema({
    id: { 
        type: String, 
        default: randomUUID(), 
        required: true,
        unique: true 
    },
    userId: { 
        type: String, 
        default: randomUUID(), 
        required: true,
        ref: 'User'
    },
    doctorId: { 
        type: String, 
        default: randomUUID(), 
        required: true,
        ref: 'Doctor'
    },
    slot: {
        type: Date,
        required: true,
        unique: true 
    },
    status: {
        type: String,
        enum: ['scheduled', 'cancelled', 'completed', 'rescheduled'],
        default: 'scheduled'
    }
}, {
    id: true,
    toJSON: {
      transform (doc, ret) {
        ret.id = ret._id
        delete ret._id
      }
    },
    timestamps: true
}); 

AppointmentSchema.index({ doctorId: 1, slot: 1 }, { unique: true });
AppointmentSchema.index({ userId: 1, slot: 1 }, { unique: true });