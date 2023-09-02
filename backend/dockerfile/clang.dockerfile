FROM gcc

WORKDIR /code
RUN touch temp.c input
RUN echo 'void main(){}' > temp.c
CMD gcc temp.c -o bin && ./bin < input