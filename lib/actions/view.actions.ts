"use server";

import Board from "../models/board.model";
import View from "../models/view.model";
import Task from "../models/task.model";
import { connectToDB } from "../mongoose";

export async function createView(name: string) {
  try {
    connectToDB();

    const view = await View.findOne({ name: name });

    if (view) {
      return 'error'
    }

    const newView = new View({ name: name });

    const newBoard = new Board({
      name: "Todo",
      description: "This item hasn't been started",
    });

    await newBoard.save();
    newView.boards.push(newBoard);

    await newView.save();

    console.log("view created successfully");
  } catch (error: any) {
    throw new Error(`Failed to create view: ${error.message}`);
  }
}

export async function fetchViews() {
  try {
    connectToDB();

    const views = await View.find({}, "id name boards")
      .populate({ path: "boards", select: "id name description" })
      .exec();

    const result = views.map((view) => ({
      id: view.id,
      name: view.name,
      boards: view.boards.map((board: any) => ({
        id: board.id,
        name: board.name,
        description: board.description,
      })),
    }));

    return result;
  } catch (error: any) {
    throw new Error(`Failed to fetch views: ${error.message}`);
  }
}

export async function fetchView(name: string) {
  try {
    connectToDB();

    const view = await View.findOne({ name: name })
      .populate({ path: "boards", populate: { path: "tasks", model: Task } })
      .exec();

    const result = {
      id: view.id,
      name: view.name,
      boards: view.boards.map((board: any) => ({
        id: board.id,
        name: board.name,
        description: board.description,
        tasks: board.tasks.map((task: any) => ({
          id: task.id,
          name: task.name,
          description: task.description,
          status: task.status,
          createdAt: task.ceratedAt,
          updatedAt: task.updatedAt,
        })),
      })),
    };

    return result;
  } catch (error: any) {
    throw new Error(`Failed to fetch view: ${error.message}`);
  }
}
