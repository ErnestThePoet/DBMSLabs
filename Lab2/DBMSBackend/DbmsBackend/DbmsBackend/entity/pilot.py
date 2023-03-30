from .base.entity import *
from .airline import Airline


@entity("pilots")
class Pilot:
    COL_ID = 0
    COL_AIRLINE_ICAO = 1

    COLUMNS = {
        COL_ID: ColumnMeta("id", "INT", "NOT NULL PRIMARY KEY"),
        COL_AIRLINE_ICAO: ColumnMeta("airlineIcao", Airline.COLUMNS[Airline.COL_ICAO].sql_type),
    }

    CREATE_TABLE_EXTRA = join_create_table_extra([
        generate_foreign_key(COLUMNS, COL_AIRLINE_ICAO, Airline, Airline.COL_ICAO)
    ])

    def __init__(self, id: int, airline_icao: str):
        self.id = id
        self.airline_icao = airline_icao
