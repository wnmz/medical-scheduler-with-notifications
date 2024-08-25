import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimeSlotsService } from './timeslots.service';
import { UpdateTimeslotDto } from './dto/update-timeslot.dto';
import { CreateTimeSlotDto } from './dto/create-timeslot.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Timeslots')
@Controller('timeslots')
export class TimeslotsController {
  constructor(private readonly timeslotsService: TimeSlotsService) {}

  @Post()
  create(@Body() createTimeslotDto: CreateTimeSlotDto) {
    return this.timeslotsService.create(createTimeslotDto);
  }

  @Get()
  findAll() {
    return this.timeslotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeslotsService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeslotDto: UpdateTimeslotDto,
  ) {
    return this.timeslotsService.update(id, updateTimeslotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeslotsService.removeById(id);
  }
}
