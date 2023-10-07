"use server";

import Board from "../models/board.model";
import View from "../models/view.model";
import { connectToDB } from "../mongoose";

export async function createBoard(
  viewId: string,
  name: string,
  description: string
) {
  try {
    connectToDB();

    const view = await View.findOne({ id: viewId });
    const newBoard = new Board({ name: name, description: description });

    const createdBoard = await newBoard.save();

    view.boards.push(createdBoard._id);
    await view.save();

    console.log("success create board");
  } catch (error: any) {
    throw new Error(`Failed to create board: ${error.message}`);
  }
}

export async function fetchBoard(boardId: string) {
  try {
    connectToDB();

    const board = await Board.findOne({ id: boardId }).populate("tasks").exec();

    const result = {
      id: board.id,
      name: board.name,
      description: board.description,
      tasks: board.tasks.map((task: any) => ({
        id: task.id,
        name: task.name,
        description: task.description,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      })),
    };

    return result
  } catch (error: any) {
    throw new Error(`Failed to fetch board: ${error.message}`);
  }
}
