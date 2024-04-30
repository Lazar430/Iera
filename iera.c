#include "raylib.h"
#include "iera.h"

#include "graphics/draw.h"

#include "util/process.h"

#include<stdio.h>

iera_status initialize_iera(){
  iera_create_window(IERA_WINDOW_WIDTH, IERA_WINDOW_HEIGHT);
  return IERA_SUCCESS;
}

iera_status loop_iera(){
  iera_raylib_set_target_fps(60);

  iera_push_process(DRAW_GRADIENT);
  while(IERA_WINDOW_IS_ACTIVE){
    IERA_BEGIN_DRAWING;

    //iera_draw_pixel(IERA_WINDOW_WIDTH / 2, IERA_WINDOW_HEIGHT / 2, IERA_GREEN);
    while(there_are_processes_to_be_executed()){
      iera_execute_process();
    }
    

    IERA_END_DRAWING;
  }
  return IERA_SUCCESS;
}

iera_status clean_iera(){
  iera_close_window();
  return IERA_SUCCESS;
}

iera_status run_iera(){
  iera_status status = IERA_SUCCESS;

  IERA_DISABLE_RAYLIB_LOG;

  if((status = initialize_iera()) != IERA_SUCCESS){
    return status;
  }

  if((status = loop_iera()) != IERA_SUCCESS){
    return status;
  }

  if((status = clean_iera()) != IERA_SUCCESS){
    return status;
  }

  return status;
}

