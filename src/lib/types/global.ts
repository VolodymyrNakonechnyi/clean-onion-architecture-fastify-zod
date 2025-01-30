import { Types, Model, Document } from "mongoose";

// Document Type
export type EntityDocument<T> = Document<unknown, {}, T> & 
  T & 
  { _id: Types.ObjectId };

// Model Type
export type EntityModel<T> = Model<
  T,
  {},
  {},
  {},
  EntityDocument<T>
>;