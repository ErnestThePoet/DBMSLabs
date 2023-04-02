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

    CREATE_TABLE_EXTRA = join_create_table_extra([
        generate_index(COLUMNS, COL_AIRPORT_ICAO)
    ])

    def __init__(self, id: int, name: str, airport_icao: str):
        self.id = id
        self.name = name
        self.airportIcao = airport_icao
