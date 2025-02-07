import mongoose, { Schema } from "mongoose";
import { randomUUID } from "crypto";

export const UserSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.UUID, 
        default: randomUUID(), 
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    firstname:  {
        type: String,
        required: true,
        max: 50
    },
    lastname:  {
        type: String,
        required: true,
        max: 50
    },
}, {
    id: true,
    toJSON: {
      transform (doc, ret) {
        ret.id = ret._id
        delete ret._id
      }
    }
});