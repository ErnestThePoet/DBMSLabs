from .base.entity import *
from .ac_manufacturer import AcManufacturer
from .fdr import Fdr
from .airline import Airline


@entity("aircrafts")
class Aircraft:
    COL_REG_NO = 0
    COL_AC_TYPE = 1

    COL_MANUFACTURER_NAME = 2
    COL_MANUFACTURE_TIME = 3

    COL_FDR_ID = 4
    COL_AIRLINE_ICAO = 5

    COLUMNS = {
        COL_REG_NO: ColumnMeta("regNo", "VARCHAR(20)", "NOT NULL PRIMARY KEY"),
        COL_AC_TYPE: ColumnMeta("acType", "VARCHAR(10)"),
        COL_MANUFACTURER_NAME: ColumnMeta("manufacturerName", AcManufacturer.COLUMNS[AcManufacturer.COL_NAME].sql_type),
        COL_MANUFACTURE_TIME: ColumnMeta("manufactureTime", "BIGINT"),
        COL_FDR_ID: ColumnMeta("fdrId", Fdr.COLUMNS[Fdr.COL_ID].sql_type),
        COL_AIRLINE_ICAO: ColumnMeta("airlineIcao", Airline.COLUMNS[Airline.COL_ICAO].sql_type)
    }

    CREATE_TABLE_EXTRA = \
        f"FOREIGN KEY ({COLUMNS[COL_MANUFACTURER_NAME].name}) REFERENCES {AcManufacturer.TABLE_NAME}({AcManufacturer.COLUMNS[AcManufacturer.COL_NAME].name})," \
        f"FOREIGN KEY ({COLUMNS[COL_FDR_ID].name}) REFERENCES {Fdr.TABLE_NAME}({Fdr.COLUMNS[Fdr.COL_ID].name})," \
        f"FOREIGN KEY ({COLUMNS[COL_AIRLINE_ICAO]}) REFERENCES {Airline.TABLE_NAME}({Airline.COLUMNS[Airline.COL_ICAO].name})"

    def __init__(self,
                 reg_no: str,
                 ac_type: str,
                 manufacturer_name: str,
                 manufacture_time: int,
                 fdr_id: int,
                 airline_icao: str):
        self.reg_no = reg_no
        self.ac_type = ac_type
        self.manufacturer_name = manufacturer_name
        self.manufacture_time = manufacture_time
        self.fdr_id = fdr_id
        self.airline_icao = airline_icao
