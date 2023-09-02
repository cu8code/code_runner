FROM gcc

WORKDIR /code
RUN touch temp.c input
RUN echo 'void main(){}' > temp.c
CMD g++ temp.c -o bin && ./bin < input