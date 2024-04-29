#ifndef DEFINES_H
#define DEFINES_H

#include<stdint.h>

#define iera_u8 uint8_t
#define iera_i8 int8_t

#define iera_u16 uint16_t
#define iera_i16 int16_t

#define iera_u32 uint32_t
#define iera_i32 int32_t

#define iera_u64 uint64_t
#define iera_i64 int64_t

#define iera_float float

#define iera_raylib_color Color

typedef struct{
  iera_u8 red;
  iera_u8 green;
  iera_u8 blue;
  iera_u8 alpha;
} iera_color;

#define IERA_RED (iera_color){255, 0, 0, 255}
#define IERA_GREEN (iera_color){0, 255, 0, 255}
#define IERA_BLUE (iera_color){0, 0, 255, 255}

#define IERA_DISABLE_RAYLIB_LOG SetTraceLogLevel(LOG_NONE)

#define iera_raylib_initialize_window InitWindow
#define iera_raylib_set_target_fps SetTargetFPS
#define iera_raylib_close_window CloseWindow
#define iera_raylib_draw_pixel DrawPixel

#define IERA_WINDOW_IS_ACTIVE !WindowShouldClose()
#define IERA_BEGIN_DRAWING BeginDrawing()
#define IERA_END_DRAWING EndDrawing()

typedef enum{
  IERA_FAILURE,
  IERA_SUCCESS
} iera_status;

#endif
