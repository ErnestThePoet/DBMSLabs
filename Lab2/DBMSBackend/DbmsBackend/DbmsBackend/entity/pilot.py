from .base.entity import *
from .Airline import Airline


@entity("pilots")
class Pilot:
    COL_ID = 0
    COL_AIRLINE_ICAO = 1

    COLUMNS = {
        COL_ID: ColumnMeta("id", "INT", "NOT NULL PRIMARY KEY"),
        COL_AIRLINE_ICAO: ColumnMeta("airlineIcao", Airline.COLUMNS[Airline.COL_ICAO].sql_type),
    }

    CREATE_TABLE_EXTRA = f"FOREIGN KEY ({COLUMNS[COL_AIRLINE_ICAO].name}) REFERENCES {Airline.TABLE_NAME}({Airline.COLUMNS[Airline.COL_ICAO].name})"

    def __init__(self, id: int, airline_icao: str):
        self.id = id
        self.airline_icao = airline_icao
