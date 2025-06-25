import { users, contacts, models, predictions, type User, type InsertUser, type Contact, type InsertContact, type Model, type InsertModel, type Prediction, type InsertPrediction } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getModels(): Promise<Model[]>;
  getModelById(id: string): Promise<Model | undefined>;
  createModel(model: InsertModel): Promise<Model>;
  deleteModel(id: string): Promise<boolean>;
  createPrediction(prediction: InsertPrediction): Promise<Prediction>;
  getPredictionsByModel(modelId: string): Promise<Prediction[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getModels(): Promise<Model[]> {
    return await db.select().from(models);
  }

  async getModelById(id: string): Promise<Model | undefined> {
    const [model] = await db.select().from(models).where(eq(models.id, id));
    return model || undefined;
  }

  async createModel(insertModel: InsertModel): Promise<Model> {
    const [model] = await db
      .insert(models)
      .values(insertModel)
      .returning();
    return model;
  }

  async deleteModel(id: string): Promise<boolean> {
    const result = await db.delete(models).where(eq(models.id, id));
    return result.rowCount > 0;
  }

  async createPrediction(insertPrediction: InsertPrediction): Promise<Prediction> {
    const [prediction] = await db
      .insert(predictions)
      .values(insertPrediction)
      .returning();
    return prediction;
  }

  async getPredictionsByModel(modelId: string): Promise<Prediction[]> {
    return await db.select().from(predictions).where(eq(predictions.modelId, modelId));
  }
}

export const storage = new DatabaseStorage();
