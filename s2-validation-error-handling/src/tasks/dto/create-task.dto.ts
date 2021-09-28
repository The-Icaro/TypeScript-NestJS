import { IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {

  /**
   * title:
   * description:
   */

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

}