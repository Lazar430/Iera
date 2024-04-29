#include "raylib.h"
#include "iera.h"
#include "graphics/draw.h"

#define WIDTH 1024
#define HEIGHT 720

iera_status initialize_iera(){
  iera_create_window(WIDTH, HEIGHT);
  return IERA_SUCCESS;
}

iera_status loop_iera(){
  iera_raylib_set_target_fps(60);
  while(IERA_WINDOW_IS_ACTIVE){
    IERA_BEGIN_DRAWING;

    iera_draw_pixel(WIDTH / 2, HEIGHT / 2, IERA_RED);

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

