#ifndef LOG_H
#define LOG_H

typedef enum{
  INFO,
  WARNING,
  ERROR
} log_type;

void IERA_LOG(log_type, char*);

#endif
