import { Student } from './../student/entity/student';
import { Employee } from 'src/employee/entity/employee';
import { Absent } from 'src/absent/entity/absent';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AbsentService } from './absent.service';
import { CreateAbsent } from './dto/createAbsent';
import { EmployeeService } from 'src/employee/employee.service';
import { StudentService } from 'src/student/student.service';

@Resolver(() => Absent)
export class AbsentResolver {
  constructor(
    private readonly absentService: AbsentService,
    private readonly employeeService: EmployeeService,
    private readonly studentService: StudentService,
  ) {}

  @Mutation(() => Absent, { name: 'createAbsent' })
  async createAbsent(@Args('absent') absent: CreateAbsent) {
    return await this.absentService.createAbsent(absent);
  }

  @Query(() => [Absent], { name: 'findAbsents' })
  async findAbsents() {
    return await this.absentService.findAbsents();
  }

  @ResolveField(() => Absent)
  async employee(@Parent() absent: Absent): Promise<Employee> {
    return await this.employeeService.findEmployee(absent.employeeId);
  }

  @ResolveField(() => Absent)
  async student(@Parent() absent: Absent): Promise<Student> {
    return await this.studentService.findStudentById(absent.studentId);
  }
}
