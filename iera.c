#include "raylib.h"
#include "iera.h"

#include "graphics/draw.h"

#include "util/process.h"
#include "util/log.h"

#include<stdio.h>

iera_status initialize_iera(){
  IERA_LOG(INFO, "Initializing IERA...\n");
  iera_create_window(IERA_WINDOW_WIDTH, IERA_WINDOW_HEIGHT);
  IERA_LOG(INFO, "Created IERA window.\n");
  return IERA_SUCCESS;
}

iera_status loop_iera(){
  iera_status status = IERA_SUCCESS;
  
  iera_raylib_set_target_fps(60);
  IERA_LOG(INFO, "Set target fps to 60.\n");

  if( (status = iera_push_process(DRAW_GRADIENT)) != IERA_SUCCESS){
    return status;
  }

  IERA_LOG(INFO, "Requested IERA to DRAW a simple GRADIENT.\n");
  while(IERA_WINDOW_IS_ACTIVE){
    IERA_BEGIN_DRAWING;

    while(there_are_processes_to_be_executed()){
      iera_execute_process();
    }
    
    IERA_END_DRAWING;
  }
  return status;
}

iera_status clean_iera(){
  IERA_LOG(INFO, "Cleaning up IERA...\n");
  iera_close_window();
  IERA_LOG(INFO, "Closed IERA window.\n");
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

