#include "raylib.h"
#include "draw.h"

void iera_create_window(iera_u16 width, iera_u16 height){
  iera_raylib_initialize_window(width, height, "");
}

void iera_close_window(){
  iera_raylib_close_window();
}

void iera_draw_pixel(iera_u16 x_position, iera_u16 y_position, iera_color pixel_color){
  iera_raylib_color color_parameter =
    (iera_raylib_color){
    pixel_color.red,
    pixel_color.green,
    pixel_color.blue,
    pixel_color.alpha
  };
  
  iera_raylib_draw_pixel(x_position, y_position, color_parameter);
}
