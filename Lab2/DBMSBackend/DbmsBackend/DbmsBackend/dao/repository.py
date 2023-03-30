import json

import mysql.connector
from DbmsBackend.DbmsBackend.dao.sql_generator import *
from DbmsBackend.DbmsBackend.entity.entities import *


class ComprehensiveRepository:
    def __init__(self):
        self.database = mysql.connector.connect(
            host="127.0.0.1",
            user="ecui",
            password="12345678",
            database="dbmslab2"
        )
        self.cursor = self.database.cursor()

    def init_tables(self):
        # A/C Manufacturers
        self.cursor.execute(generate_create_table(AcManufacturer))
        self.cursor.execute(generate_create_table(Airline))
        self.cursor.execute(generate_create_table(Aircraft))
        self.cursor.execute(generate_create_table(Fdr))

        self.cursor.execute(generate_create_table(Flight))
        self.cursor.execute(generate_create_table(Pilot))
        self.cursor.execute(generate_create_table(PilotFlight))

        self.cursor.execute(generate_create_table(Airport))
        self.cursor.execute(generate_create_table(AirController))

cr=ComprehensiveRepository()
cr.init_tables()