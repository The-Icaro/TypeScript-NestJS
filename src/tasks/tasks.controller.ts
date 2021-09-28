import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) { }


  @Get()
  getTasks(@Query() filterDTO: GetTaskFilterDTO): Array<Task> {
    
    if (Object.keys(filterDTO).length){

      return this.tasksService.getTasksWithFilter(filterDTO);
    } else {

      return this.tasksService.getAllTasks();
    }
    
  };

  @Get('/:id')
  // @Param('x) == Request.params
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  };

  @Post()
  // @Body() -> Catch all the json on body 
  // @Body('x') -> Catch only x property
  // or for scalable use DTO
  createTask(@Body() createTaksDTO: CreateTaskDTO ): Task {
    return this.tasksService.createTask(createTaksDTO);
  };

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string, 
    @Body('status') status: TaskStatus): Task {
    return this.tasksService.updateTaskStatus(id, status);
  };

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void{
    return this.tasksService.deleteTaskById(id);
  };

}
