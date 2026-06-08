import { Controller, Get, Post, Patch, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@CurrentUser('id') userId: string, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(userId, dto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('status') status?: string,
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('lat') lat?: number,
    @Query('lng') lng?: number,
    @Query('radiusKm') radiusKm?: number
  ) {
    return this.tasksService.findAll({
      search,
      category,
      status,
      city,
      minPrice,
      maxPrice,
      lat: lat ? Number(lat) : undefined,
      lng: lng ? Number(lng) : undefined,
      radiusKm: radiusKm ? Number(radiusKm) : undefined
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  @Post(':id/apply')
  apply(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body('coverLetter') coverLetter: string,
    @Body('proposedPrice') proposedPrice: number
  ) {
    return this.tasksService.apply(id, userId, coverLetter, proposedPrice);
  }

  @Post(':id/assign')
  assign(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body('applicantId') applicantId: string
  ) {
    return this.tasksService.assign(id, userId, applicantId);
  }

  @Post(':id/complete')
  complete(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.tasksService.complete(id, userId);
  }
}
export default TasksController;
