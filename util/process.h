#ifndef PROCESS_H
#define PROCESS_H

#include "defines.h"

typedef enum{
  DEFAULT,
  DRAW_GRADIENT
} process_type;

iera_status iera_push_process(process_type);
iera_u8 there_are_processes_to_be_executed();
void iera_execute_process();

#endif
