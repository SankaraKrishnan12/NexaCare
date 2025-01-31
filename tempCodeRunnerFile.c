    #include <stdio.h>
    int main()
    {
        int num1=2,num2=3;
        int *p =&num1,*q=&num2;
        *p++=*q++;
        printf("%d %d" ,*q,*(q++));
    }