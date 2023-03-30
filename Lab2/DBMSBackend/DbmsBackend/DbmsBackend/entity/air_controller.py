from .base.entity import *
from .airport import Airport


@entity("air_controllers")
class AirController:
    COL_ID = 0
    COL_AIRPORT_ICAO = 1

    COLUMNS = {
        COL_ID: ColumnMeta("id", "INT", "NOT NULL PRIMARY KEY"),
        COL_AIRPORT_ICAO: ColumnMeta("airportIcao", Airport.COLUMNS[Airport.COL_ICAO].sql_type)
    }

    def __init__(self, id: int, airport_icao: str):
        self.id = id
        self.airport_icao = airport_icao
