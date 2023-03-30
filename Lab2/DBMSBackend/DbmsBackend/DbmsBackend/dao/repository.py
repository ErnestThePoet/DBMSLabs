import json

import mysql.connector

class ComprehensiveRepository:
    def __init__(self):
        self.database = mysql.connector.connect(
            host="127.0.0.1",
            user="ecui",
            password="12345678",
            database="dbmalab4"
        )
        self.cursor = self.database.cursor()

    def init_tables(self):
        # A/C Manufacturers
        self.cursor.execute("CREATE TABLE IF NOT EXISTS ")
