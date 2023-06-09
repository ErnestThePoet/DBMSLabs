from .base.entity import *
from .airline import Airline


@entity("pilots")
class Pilot:
    COL_ID = 0
    COL_NAME = 1
    COL_AIRLINE_ICAO = 2

    COLUMNS = {
        COL_ID: ColumnMeta("id", "INT", "NOT NULL PRIMARY KEY"),
        COL_NAME: ColumnMeta("name", "VARCHAR(30)", "NOT NULL"),
        COL_AIRLINE_ICAO: ColumnMeta("airlineIcao", Airline.COLUMNS[Airline.COL_ICAO].sql_type),
    }

    CREATE_TABLE_EXTRA = join_create_table_extra([
        generate_foreign_key(COLUMNS, COL_AIRLINE_ICAO, Airline, Airline.COL_ICAO)
    ])

    def __init__(self, id: int, name: str, airline_icao: str):
        self.id = id
        self.name = name
        self.airlineIcao = airline_icao
