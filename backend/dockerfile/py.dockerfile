FROM python

WORKDIR /code
RUN touch temp.py input

CMD python temp.py < input