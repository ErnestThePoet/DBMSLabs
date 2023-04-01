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

    def _exec_sql(self, sql: str):
        self.cursor.execute(sql)

    def _exec_sql_commit(self, sql: str):
        self.cursor.execute(sql)
        self.database.commit()

    def create_table(self, entity_class):
        self._exec_sql_commit(generate_create_table_sql(entity_class))

    def insert(self, entity):
        self._exec_sql_commit(generate_insert_sql(entity))

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

        self.insert(Pilot(101, "Pilot A", "CCA"))
        self.insert(Pilot(102, "Pilot B", "CCA"))
        self.insert(Pilot(103, "Pilot C", "CCA"))
        self.insert(Pilot(201, "Pilot D", "CES"))
        self.insert(Pilot(202, "Pilot E", "CES"))
        self.insert(Pilot(203, "Pilot F", "CES"))
        self.insert(Pilot(301, "Pilot G", "CSN"))
        self.insert(Pilot(302, "Pilot H", "CSN"))
        self.insert(Pilot(303, "Pilot I", "CSN"))
        self.insert(Pilot(401, "Pilot J", "CDG"))
        self.insert(Pilot(402, "Pilot K", "CDG"))
        self.insert(Pilot(403, "Pilot L", "CDG"))

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

        self.insert(AirController(11, "ATC A", "ZBAA"))
        self.insert(AirController(12, "ATC B", "ZBAD"))
        self.insert(AirController(13, "ATC C", "ZSJN"))
        self.insert(AirController(14, "ATC D", "ZSQD"))
        self.insert(AirController(15, "ATC E", "ZSYT"))
        self.insert(AirController(16, "ATC F", "ZSPD"))
        self.insert(AirController(17, "ATC G", "ZUCK"))
        self.insert(AirController(18, "ATC H", "ZYTX"))
        self.insert(AirController(19, "ATC I", "ZYCC"))
        self.insert(AirController(20, "ATC J", "ZYHB"))

    def add_flight(self, flight: Flight, pilot_id: int):
        self.insert(flight)
        self.insert(PilotFlight(
            flight.flightNbr, flight.origIcao, flight.destIcao, flight.depTime, pilot_id))

    def delete_flight(self,
                      flightNbr: str,
                      origIcao: str,
                      destIcao: str,
                      depTime: int):
        self._exec_sql_commit(f"DELETE FROM {Flight.TABLE_NAME} WHERE "
                              f"{Flight.COLUMNS[Flight.COL_FLIGHT_NBR].name}='{flightNbr}' AND "
                              f"{Flight.COLUMNS[Flight.COL_ORIG_ICAO].name}='{origIcao}' AND "
                              f"{Flight.COLUMNS[Flight.COL_DEST_ICAO].name}='{destIcao}' AND "
                              f"{Flight.COLUMNS[Flight.COL_DEP_TIME].name}={depTime};"
                              )

    def get_all_flight_info(self):
        flight_column_names = [
            Flight.COLUMNS[Flight.COL_FLIGHT_NBR].name,
            Flight.COLUMNS[Flight.COL_ORIG_ICAO].name,
            Flight.COLUMNS[Flight.COL_DEST_ICAO].name,
            Flight.COLUMNS[Flight.COL_DEP_TIME].name,
            Flight.COLUMNS[Flight.COL_ARR_TIME].name
        ]

        aircraft_column_names = [
            Aircraft.COLUMNS[Aircraft.COL_REG_NO].name,
            Aircraft.COLUMNS[Aircraft.COL_AC_TYPE].name
        ]

        pilot_column_names = [
            Pilot.COLUMNS[Pilot.COL_ID].name,
            Pilot.COLUMNS[Pilot.COL_NAME].name
        ]

        group_by_column_names = [
            Flight.COLUMNS[Flight.COL_FLIGHT_NBR].name,
            Flight.COLUMNS[Flight.COL_ORIG_ICAO].name,
            Flight.COLUMNS[Flight.COL_DEST_ICAO].name,
            Flight.COLUMNS[Flight.COL_DEP_TIME].name
        ]

        concat_separator = "' '"

        self._exec_sql(f"SELECT {','.join(['FLT.' + x for x in flight_column_names])},"
                       f"{','.join(['AC.' + x for x in aircraft_column_names])},"
                       f"{','.join([f'GROUP_CONCAT(PILOT.{x} SEPARATOR {concat_separator})' for x in pilot_column_names])} "
                       f"FROM {Flight.TABLE_NAME} AS FLT "
                       f"INNER JOIN {Aircraft.TABLE_NAME} AS AC "
                       f"ON FLT.{Flight.COLUMNS[Flight.COL_AC_REG_NO].name}=AC.{Aircraft.COLUMNS[Aircraft.COL_REG_NO].name} "
                       f"NATURAL JOIN {PilotFlight.TABLE_NAME} AS PF "
                       f"INNER JOIN {Pilot.TABLE_NAME} AS PILOT "
                       f"ON PF.{PilotFlight.COLUMNS[PilotFlight.COL_PILOT_ID].name}=PILOT.{Pilot.COLUMNS[Pilot.COL_ID].name} "
                       f"GROUP BY {','.join(['FLT.' + x for x in group_by_column_names])};")

        property_names = [
            *flight_column_names,
            *aircraft_column_names,
            *pilot_column_names
        ]
        tuples = self.cursor.fetchall()
        results = []

        for current_tuple in tuples:
            current_result = {}
            for i in range(len(property_names)):
                current_result[property_names[i]] = current_tuple[i]
            results.append(current_result)

        return results

    def get_air_controller_by_flight_nbr(self, flight_nbr: str):
        property_names = [AirController.COLUMNS[x].name for x in Flight.COLUMNS]
        self._exec_sql(f"SELECT {','.join(['ATC.' + AirController.COLUMNS[x].name for x in Flight.COLUMNS])} "
                       f"FROM {AirController.TABLE_NAME} AS ATC "
                       f"WHERE EXISTS("
                       f"SELECT 1 FROM {Flight.TABLE_NAME} AS FLT "
                       f"WHERE FLT.{Flight.COLUMNS[Flight.COL_FLIGHT_NBR].name}='{flight_nbr}' AND ("
                       f"FLT.{Flight.COLUMNS[Flight.COL_ORIG_ICAO].name}="
                       f"ATC.{AirController.COLUMNS[AirController.COL_AIRPORT_ICAO].name} OR "
                       f"FLT.{Flight.COLUMNS[Flight.COLUMNS[Flight.COL_DEST_ICAO].name]}="
                       f"ATC.{AirController.COLUMNS[AirController.COL_AIRPORT_ICAO]}));")

        tuples = self.cursor.fetchall()
        results = []

        for current_tuple in tuples:
            current_result = {}
            for i in range(len(property_names)):
                current_result[property_names[i]] = current_tuple[i]
            results.append(current_result)

        return results

    def get_all_airline_flight_count(self):
        self._exec_sql(f"SELECT AC.{Aircraft.COLUMNS[Aircraft.COL_AIRLINE_ICAO].name},COUNT(1) "
                       f"FROM {Flight.TABLE_NAME} AS FLT "
                       f"INNER JOIN {Aircraft.TABLE_NAME} "
                       f"ON FLT.{Flight.COLUMNS[Flight.COL_AC_REG_NO].name}=AC.{Aircraft.COLUMNS[Aircraft.COL_REG_NO].name} "
                       f"GROUP BY AC.{Aircraft.COLUMNS[Aircraft.COL_AIRLINE_ICAO].name};")

        tuples = self.cursor.fetchall()
        return [{"icao": x[0], "flightCount": x[1]} for x in tuples]

