FROM python:3.10

# Display the Python output through the terminal
ENV PYTHONUNBUFFERED: 1

WORKDIR /usr/src/app

RUN pip install --upgrade pip
COPY requirements.txt ./requirements.txt

RUN pip3 install -r requirements.txt


COPY ./entrypoint /entrypoint
# RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

COPY ./django-launcher.sh /django-launcher.sh
# RUN sed -i 's/\r$//g' /start
RUN chmod +x /django-launcher.sh

ENTRYPOINT ["/entrypoint"]
