from .base.entity import *


@entity("airports")
class Airport:
    COL_ICAO = 0
    COL_IATA = 1
    COL_CITY_NAME = 2
    COL_NAME = 3

    COLUMNS = {
        COL_ICAO: ColumnMeta("icao", "CHAR(4)", "NOT NULL PRIMARY KEY"),
        COL_IATA: ColumnMeta("iata", "CHAR(3)"),
        COL_CITY_NAME: ColumnMeta("cityName", "VARCHAR(20)"),
        COL_NAME: ColumnMeta("name", "VARCHAR(20)")
    }

    def __init__(self, icao: str, iata: str, city_name: str, name: str):
        self.icao = icao
        self.iata = iata
        self.cityName = city_name
        self.name = name
