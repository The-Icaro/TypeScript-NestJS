import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTaskFilterDTO } from "./dto/get-task-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  public async getTasks(filterDTO: GetTaskFilterDTO): Promise<Array<Task>> {

    const { status, search } = filterDTO;

    const query = this.createQueryBuilder('task');

    if ( status )
      query.andWhere('task.status = :status', { status });

    if ( search )
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
      { search: `%${search}%` })
    

    const tasks = await query.getMany();

    return tasks;

  }
  
  public async createTask(createTaksDTO: CreateTaskDTO): Promise<Task> {

    const { title, description } = createTaksDTO;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN
    });

    await this.save(task);

    return task;
  }

}