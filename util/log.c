#include "log.h"

#include "defines.h"

#include<stdio.h>

void IERA_LOG(log_type type, char* message){
  switch(type){
  case INFO:
    fprintf(stderr, IERA_TERMINAL_GREEN "INFO: ");
    break;
    
  case WARNING:
    fprintf(stderr, IERA_TERMINAL_YELLOW "WARNING: ");
    break;
    
  case ERROR:
    fprintf(stderr, IERA_TERMINAL_RED "ERROR: ");
    break;
  }

  printf(IERA_TERMINAL_RESET);
  printf(message);
  printf("\n");
}
