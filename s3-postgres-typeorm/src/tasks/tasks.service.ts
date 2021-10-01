import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { filter } from 'rxjs';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor (
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
    ) {}

  public async getTasks(filterDTO: GetTaskFilterDTO): Promise<Array<Task>> {
    return this.taskRepository.getTasks(filterDTO);
  }

  public async getTaskById(id: string): Promise<Task> {
    const foundTask = await this.taskRepository.findOne(id);

    if(!foundTask)
      throw new NotFoundException(`Task with ID : ${id} not Found!`);

    return foundTask;

  }

  public async createTask(createTaksDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaksDTO);
  }

  public async updateTaskStatus(id: string, status: TaskStatus) : Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.taskRepository.save(task);

    return task
    
  }

  public async deleteTaskById(id: string): Promise<void> {
    const taskDeleted = await this.taskRepository.delete(id);

    if( taskDeleted.affected === 0 )
      throw new NotFoundException(`Task with ID : ${id} not Found!`);

  }

}
