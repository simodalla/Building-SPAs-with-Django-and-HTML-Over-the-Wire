FROM python:3.10

# Display the Python output through the terminal
ENV PYTHONUNBUFFERED: 1

WORKDIR /usr/src/app

RUN pip install --upgrade pip
COPY requirements.txt ./requirements.txt

RUN pip3 install -r requirements.txt
