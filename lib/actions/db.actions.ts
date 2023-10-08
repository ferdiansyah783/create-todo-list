"use server"

import Board from "../models/board.model";
import Task from "../models/task.model";
import View from "../models/view.model";
import { connectToDB } from "../mongoose";

export async function resetDatabase() {
  try {
    connectToDB();

    await View.deleteMany();
    await Board.deleteMany();
    await Task.deleteMany();

    const newTask = new Task({ name: "start todo", status: "Todo" });
    await newTask.save()

    const newBoard = new Board({
      name: "Todo",
      description: "This item hasn't been started",
      tasks: [newTask]
    });
    await newBoard.save()

    const newView = new View({ name: "view 1", boards: [newBoard] });
    await newView.save()

    console.log('reset db successfully')
    console.log('seeding db successfully')
  } catch (error: any) {
    throw new Error(`failed to reset db: ${error.message}`);
  }
}
