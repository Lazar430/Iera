#include "../graphics/draw.h"
#include "process.h"
#include "../iera.h"
#include "queue.h"

#include<stdio.h>

void draw_home_screen(){
  iera_draw_pixel(IERA_WINDOW_WIDTH / 2, IERA_WINDOW_HEIGHT / 2, (iera_color){255, 0, 0, 255});
}

void draw_gradient(){
  for(iera_u32 height = 0; height < IERA_WINDOW_HEIGHT; ++height){
    for(iera_u32 width = 0; width < IERA_WINDOW_WIDTH; ++width){
      iera_draw_pixel(width, height, (iera_color){
	  255 * ((float)width / IERA_WINDOW_WIDTH), 255 * ((float)height / IERA_WINDOW_HEIGHT),
	  0, 255}
	);
    }
  } 
}

void iera_push_process(process_type type){
  enqueue_process(type);
}

iera_u8 there_are_processes_to_be_executed(){
  return check_processes();
}

void iera_execute_process(){
  switch(dequeue_process()){
  case DRAW_GRADIENT:
    draw_gradient();
    break;
  default:
    draw_home_screen();
  }
}
