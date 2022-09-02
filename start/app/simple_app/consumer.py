import threading
import time
from datetime import datetime
from random import randint

from channels.generic.websocket import JsonWebsocketConsumer, WebsocketConsumer


class EchoConsumer(WebsocketConsumer):
    def connect(self):
        # informs clients of successful connection
        self.accept()

        # send message to client
        self.send(text_data="You are connected by WebSockets!")

        def send_time(self):
            while True:
                self.send(text_data=str(datetime.now().strftime("%H:%M:%S")))
                time.sleep(1)

        threading.Thread(target=send_time, args=(self,)).start()

    def disconnect(self, code):
        pass

    def receive(self, text_data=None, bytes_data=None):
        pass


class BingoConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.accept()
        random_numbers = list(set([randint(1, 10) for _ in range(5)]))
        message = {
            "action": "New ticket",
            "ticket": random_numbers,
        }
        self.send_json(content=message)

        def send_ball(self):
            while True:
                random_ball = randint(1, 10)
                message = {
                    "action": "New ball",
                    "ball": random_ball,
                }
                self.send_json(content=message)
                time.sleep(1)

        threading.Thread(target=send_ball, args=(self,)).start()

    def disconnect(self, code):
        return super().disconnect(code)

    def receive_json(self, content, **kwargs):
        return super().receive_json(content, **kwargs)
