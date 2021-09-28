import { TaskStatus } from "../tasks.model";

export class GetTaskFilterDTO {

  /**Json
   * status?:
   * search?:
   */

  status?: TaskStatus;
  search?: string;

}