"use server";

import Board from "../models/board.model";
import Task from "../models/task.model";
import { connectToDB } from "../mongoose";

export async function createTask(
  boardId: string,
  name: string,
  description = ""
) {
  try {
    connectToDB();

    const board = await Board.findOne({ id: boardId });

    const newTask = new Task({
      name: name,
      description: description,
      status: board.name,
    });

    const createdTask = await newTask.save();

    board.tasks.push(createdTask);

    await board.save();

    console.log("task created successfullu");
  } catch (error: any) {
    throw new Error(`failed to create task: ${error.message}`);
  }
}

export async function deleteTaskAndReferences(taskId: string) {
  try {
    connectToDB();

    const task = await Task.findOne({ id: taskId });

    if (!task) {
      console.log("task not found");
      return;
    }

    const taskToDeleteId = task._id;

    await Task.deleteOne({ id: taskId });
    await Board.updateMany(
      { tasks: taskToDeleteId },
      { $pull: { tasks: taskToDeleteId } }
    );
  } catch (error: any) {
    throw new Error(`failed to delete task: ${error.message}`);
  }
}
