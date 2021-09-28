import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import {v4 as uuid} from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { filter } from 'rxjs';

@Injectable()
export class TasksService {

  private tasks: Array<Task> = [];

  // GET
  public getAllTasks() : Array<Task>{
    return this.tasks;
  }

  public getTaskById(id: string): Task{
    const foundTask = this.tasks.find((task) => task.id === id);

    if (!foundTask)
      throw new NotFoundException(`Task with ID : ${id} not Found!`);
    
    return foundTask;

  }

  public getTasksWithFilter(filterDTO: GetTaskFilterDTO): Array<Task> {
    
    const { status, search } = filterDTO;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = this.tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = this.tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true
        } else {
          return false
        }
      });
    }

    return tasks;

  }

  // POST
  public createTask(createTaksDTO: CreateTaskDTO) : Task {

    const { title, description } = createTaksDTO;

    const task: Task = {
        id: uuid(),
        title,
        description,
        status: TaskStatus.OPEN
    };

    this.tasks.push(task)

    return task;

  }

  // PATCH
  public updateTaskStatus(id: string, status: TaskStatus) : Task {

    const task = this.getTaskById(id); // Also Using the NotFound Error from getTaskById

    task.status = status;

    return task;

  }

  // DELETE
  public deleteTaskById(id: string) : void {
    const found = this.getTaskById(id); // For the Validation System
    const taskIndex = this.tasks.findIndex((task) => task.id === found.id);

    this.tasks.splice(taskIndex, 1);
  }

}
