from .base.entity import *
from .airport import Airport


@entity("air_controllers")
class AirController:
    COL_ID = 0
    COL_NAME = 1
    COL_AIRPORT_ICAO = 2

    COLUMNS = {
        COL_ID: ColumnMeta("id", "INT", "NOT NULL PRIMARY KEY"),
        COL_NAME: ColumnMeta("name", "VARCHAR(30)", "NOT NULL"),
        COL_AIRPORT_ICAO: ColumnMeta("airportIcao", Airport.COLUMNS[Airport.COL_ICAO].sql_type)
    }

    def __init__(self, id: int, name: str, airportIcao: str):
        self.id = id
        self.name = name
        self.airportIcao = airportIcao
