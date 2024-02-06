import {UserDTO} from "./user-dto";
import {ExamStatus} from "../enum/exam-status";

export interface ExamDTO {
  curriculum: string;
  studentYear: string;
  room: string;
  scheduledDateTime: string;
  examStatus: ExamStatus;
  teachers: UserDTO;
}
