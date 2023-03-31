import json

import mysql.connector
# from .sql_generator import *
# from ..entity.entities import *
from DbmsBackend.DbmsBackend.entity.entities import *
from DbmsBackend.DbmsBackend.dao.sql_generator import *


class ComprehensiveRepository:
    def __init__(self):
        self.database = mysql.connector.connect(
            host="127.0.0.1",
            user="ecui",
            password="12345678",
            database="dbmslab2"
        )
        self.cursor = self.database.cursor()

        self._create_tables()
        self._init_tables()

    def create_table(self, entity_class):
        self.cursor.execute(generate_create_table_sql(entity_class))
        self.database.commit()

    def insert(self, entity):
        self.cursor.execute(generate_insert_sql(entity))
        self.database.commit()

    def _create_tables(self):
        self.create_table(AcManufacturer)
        self.create_table(Airline)
        self.create_table(Aircraft)
        self.create_table(Fdr)

        self.create_table(Flight)
        self.create_table(Pilot)
        self.create_table(PilotFlight)

        self.create_table(Airport)
        self.create_table(AirController)

    def _init_tables(self):
        self.insert(AcManufacturer("Airbus"))
        self.insert(AcManufacturer("Boeing"))

        self.insert(Airline("CCA", "CA", "Air China"))
        self.insert(Airline("CES", "MU", "China Eastern Airlines"))
        self.insert(Airline("CSN", "CZ", "China Southern Airlines"))
        self.insert(Airline("CDG", "SC", "Shandong Airlines"))

        self.insert(Aircraft("B-1417", "B738", "Boeing", 1585624486, "CCA"))
        self.insert(Aircraft("B-1909", "B738", "Boeing", 1565624486, "CCA"))
        self.insert(Aircraft("B-6031", "A319", "Airbus", 1535624486, "CCA"))
        self.insert(Aircraft("B-8495", "A321", "Airbus", 1555624486, "CCA"))
        self.insert(Aircraft("B-6213", "A319", "Airbus", 1505624486, "CCA"))
        self.insert(Aircraft("B-6456", "A319", "Airbus", 1505624486, "CES"))
        self.insert(Aircraft("B-6003", "A320", "Airbus", 1515624486, "CES"))
        self.insert(Aircraft("B-307F", "A20N", "Airbus", 1585624486, "CES"))
        self.insert(Aircraft("B-6680", "A320", "Airbus", 1505624486, "CSN"))
        self.insert(Aircraft("B-8640", "A321", "Airbus", 1505624486, "CSN"))
        self.insert(Aircraft("B-30EA", "A359", "Airbus", 1575624486, "CSN"))
        self.insert(Aircraft("B-5352", "B738", "Boeing", 1505624486, "CDG"))
        self.insert(Aircraft("B-20EZ", "B738", "Boeing", 1585624486, "CDG"))
        self.insert(Aircraft("B-7669", "B738", "Boeing", 1565624486, "CDG"))

        self.insert(Fdr(1001, "B-1417"))
        self.insert(Fdr(1002, "B-1909"))
        self.insert(Fdr(1003, "B-6031"))
        self.insert(Fdr(1004, "B-8495"))
        self.insert(Fdr(1005, "B-6213"))
        self.insert(Fdr(1006, "B-6456"))
        self.insert(Fdr(1007, "B-6003"))
        self.insert(Fdr(1008, "B-307F"))
        self.insert(Fdr(1009, "B-6680"))
        self.insert(Fdr(1010, "B-8640"))
        self.insert(Fdr(1011, "B-30EA"))
        self.insert(Fdr(1012, "B-5352"))
        self.insert(Fdr(1013, "B-20EZ"))
        self.insert(Fdr(1014, "B-7669"))

        self.insert(Pilot(101, "CCA"))
        self.insert(Pilot(102, "CCA"))
        self.insert(Pilot(103, "CCA"))
        self.insert(Pilot(201, "CES"))
        self.insert(Pilot(202, "CES"))
        self.insert(Pilot(203, "CES"))
        self.insert(Pilot(301, "CSN"))
        self.insert(Pilot(302, "CSN"))
        self.insert(Pilot(303, "CSN"))
        self.insert(Pilot(401, "CDG"))
        self.insert(Pilot(402, "CDG"))
        self.insert(Pilot(403, "CDG"))

        self.insert(Airport("ZBAA", "PEK", "Beijing", "Capital"))
        self.insert(Airport("ZBAD", "PKX", "Beijing", "Daxing"))
        self.insert(Airport("ZSJN", "TNA", "Jinan", "Yaoqiang"))
        self.insert(Airport("ZSQD", "TAO", "Qingdao", "Jiaodong"))
        self.insert(Airport("ZSYT", "YNT", "Yantai", "Penglai"))
        self.insert(Airport("ZSPD", "PVG", "Shanghai", "Pudong"))
        self.insert(Airport("ZUCK", "CKG", "Chongqing", "Jiangbei"))
        self.insert(Airport("ZYTX", "SHE", "Shenyang", "Taoxian"))
        self.insert(Airport("ZYCC", "CGQ", "Changchun", "Longjia"))
        self.insert(Airport("ZYHB", "HRB", "Harbin", "Taiping"))

        self.insert(AirController(11, "ZBAA"))
        self.insert(AirController(12, "ZBAD"))
        self.insert(AirController(13, "ZSJN"))
        self.insert(AirController(14, "ZSQD"))
        self.insert(AirController(15, "ZSYT"))
        self.insert(AirController(16, "ZSPD"))
        self.insert(AirController(17, "ZUCK"))
        self.insert(AirController(18, "ZYTX"))
        self.insert(AirController(19, "ZYCC"))
        self.insert(AirController(20, "ZYHB"))

    def add_flight(self, flight: Flight):
        pass


try:
    cr = ComprehensiveRepository()
except Exception as e:
    print(e)
