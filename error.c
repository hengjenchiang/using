#include <stdio.h>                           
#include <stdlib.h>                          

int main(void)                               
{                                            
    int *i_ptr = (int *) malloc(sizeof(int));  
    if (!i_ptr) {                              
        perror("Failed to allocate int\n");  
        goto ERROR;                          
    }                                        

    /* Do more things here. */               

    free(i_ptr);                               

    return 0;                                

ERROR:                                       
    if (i_ptr)                                 
        free(i_ptr);                           

    return 1;                                
}