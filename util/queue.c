#include "queue.h"

#include "../iera.h"

#include "process.h"
#include "log.h"

#include<stdio.h>
#include<stdint.h>
#include<stdlib.h>

typedef struct iera_node iera_node;

struct iera_node{
  iera_node* next;
  process_type data;
};

struct iera_queue{
  iera_node* front;
  iera_node* rear;
};

static iera_queue* process_queue = NULL;

iera_status enqueue_process(process_type data){
  if(process_queue == NULL){
    if( (process_queue = malloc(sizeof(iera_queue))) == NULL ){
      IERA_LOG(ERROR, "Could not allocate process queue. Aborting...");
      return IERA_FAILURE;
    }
    process_queue->front = NULL;
    process_queue->rear = NULL;
  }
  
  iera_node* temp;  
  if( (temp = malloc(sizeof(iera_node))) == NULL ){
    IERA_LOG(ERROR, "Could not allocate process data node. Aborting...");
      return IERA_FAILURE;
  }
  
  temp->data = data;
  temp->next = NULL;
    
  if(process_queue->rear == NULL){
    process_queue->front = process_queue->rear = temp;
  } else {
    process_queue->rear->next = temp;
    process_queue->rear = temp;
  }

  return IERA_SUCCESS;
}

iera_i32 dequeue_process(){
  iera_i32 data = 0;

  if(process_queue != NULL){
    iera_node* temp = process_queue->front;
    process_queue->front = process_queue->front->next;
    
    if(process_queue->front == NULL){
      process_queue->rear = NULL;
      free(process_queue);
      process_queue = NULL;
    }

    data = temp->data;
    free(temp);
  } else{
    IERA_LOG(WARNING, "Attempt to dequeue an empty queue.");
  }
  
  return data;
}

void peek_process(){
  printf("%d\n", process_queue->front->data);
}

iera_u8 check_processes(){
  if(process_queue != NULL){
    return process_queue->front != NULL;
  }

  return 0;
}

void clear_node(iera_node* node){
  if(node->next != NULL){
    clear_node(node->next);
  }
  free(node);
}

void clear_queue(){
  if((process_queue != NULL)){
    if(process_queue->front != NULL){
      clear_node(process_queue->front);
    }
    free(process_queue);
    } else{
    IERA_LOG(WARNING, "Attempt to clear an empty queue.");
  }
}
    
void print_node(iera_node* node){
  printf("%d\n", node->data);
  if(node->next != NULL){
    print_node(node->next);
  }
}

void print_queue(){
  if(process_queue != NULL){
    if(process_queue->front != NULL){
      print_node(process_queue->front);
    }
  } else{
    IERA_LOG(WARNING, "Attempt to print an empty queue.");
  } 
}
