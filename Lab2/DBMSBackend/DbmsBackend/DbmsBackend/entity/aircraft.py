from .base.entity import *
from .ac_manufacturer import AcManufacturer
from .airline import Airline


@entity("aircrafts")
class Aircraft:
    COL_REG_NO = 0
    COL_AC_TYPE = 1

    COL_MANUFACTURER_NAME = 2
    COL_MANUFACTURE_TIME = 3

    COL_AIRLINE_ICAO = 4

    COLUMNS = {
        COL_REG_NO: ColumnMeta("regNo", "VARCHAR(20)", "NOT NULL PRIMARY KEY"),
        COL_AC_TYPE: ColumnMeta("acType", "VARCHAR(10)"),
        COL_MANUFACTURER_NAME: ColumnMeta("manufacturerName", AcManufacturer.COLUMNS[AcManufacturer.COL_NAME].sql_type),
        COL_MANUFACTURE_TIME: ColumnMeta("manufactureTime", "BIGINT"),
        COL_AIRLINE_ICAO: ColumnMeta("airlineIcao", Airline.COLUMNS[Airline.COL_ICAO].sql_type)
    }

    CREATE_TABLE_EXTRA = join_create_table_extra([
        generate_foreign_key(COLUMNS, COL_MANUFACTURER_NAME, AcManufacturer, AcManufacturer.COL_NAME),
        generate_foreign_key(COLUMNS, COL_AIRLINE_ICAO, Airline, Airline.COL_ICAO)
    ])

    def __init__(self,
                 reg_no: str,
                 ac_type: str,
                 manufacturer_name: str,
                 manufacture_time: int,
                 airline_icao: str):
        self.regNo = reg_no
        self.acType = ac_type
        self.manufacturerName = manufacturer_name
        self.manufactureTime = manufacture_time
        self.airlineIcao = airline_icao
