"use server";

import View from "../models/view.model";
import { connectToDB } from "../mongoose";

export async function createView(name: string) {
  try {
    connectToDB();

    const newView = new View({ name: name });
    await newView.save();

    console.log("view created successfully");
  } catch (error: any) {
    throw new Error(`Failed to create view: ${error.message}`);
  }
}

export async function fetchViews() {
  try {
    connectToDB();

    const views = await View.find({}, 'id name').exec();

    return views;
  } catch (error: any) {
    throw new Error(`Failed to fetch view: ${error.message}`);
  }
}
