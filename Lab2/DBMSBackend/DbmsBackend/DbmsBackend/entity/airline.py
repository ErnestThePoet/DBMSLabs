from .base.entity import *


@entity("airlines")
class Airline:
    COL_ICAO = 0
    COL_IATA = 1
    COL_NAME = 2

    COLUMNS = {
        COL_ICAO: ColumnMeta("icao", "CHAR(3)", "NOT NULL PRIMARY KEY"),
        COL_IATA: ColumnMeta("iata", "CHAR(2)"),
        COL_NAME: ColumnMeta("name", "VARCHAR(50)"),
    }

    def __init__(self, icao: str, iata: str, name: str):
        self.icao = icao
        self.iata = iata
        self.name = name
