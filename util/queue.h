#ifndef QUEUE_H
#define QUEUE_H

#include "process.h"

typedef struct iera_queue iera_queue;

void enqueue_process(process_type);
iera_i32 dequeue_process();
void peek_process();

iera_u8 check_processes();

void print_process_queue();
void clear_process_queue();

#endif
