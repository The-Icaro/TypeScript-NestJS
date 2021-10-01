import { IsEnum } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class UpdateTaskStatusDTO {

  /**Json 
   * status: Result One of TaskStatus Enum 
   */

  @IsEnum(TaskStatus)
  status: TaskStatus;

}