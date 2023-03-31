from .base.entity import *
from .aircraft import Aircraft


@entity("flights")
class Flight:
    COL_FLIGHT_NBR = 0
    COL_ORIG_ICAO = 1
    COL_DEST_ICAO = 2
    COL_DEP_TIME = 3
    COL_ARR_TIME = 4

    COL_AC_REG_NO = 5

    COLUMNS = {
        COL_FLIGHT_NBR: ColumnMeta("flightNbr", "VARCHAR(20)", "NOT NULL"),
        COL_ORIG_ICAO: ColumnMeta("origIcao", "CHAR(4)", "NOT NULL"),
        COL_DEST_ICAO: ColumnMeta("destIcao", "CHAR(4)", "NOT NULL"),
        COL_DEP_TIME: ColumnMeta("depTime", "BIGINT", "NOT NULL"),
        COL_ARR_TIME: ColumnMeta("arrTime", "BIGINT"),
        COL_AC_REG_NO: ColumnMeta("acRegNo", Aircraft.COLUMNS[Aircraft.COL_REG_NO].sql_type)
    }

    CREATE_TABLE_EXTRA = join_create_table_extra([
        generate_composite_primary_key(COLUMNS, [COL_AC_REG_NO, COL_ORIG_ICAO, COL_DEST_ICAO, COL_DEP_TIME]),
        generate_index(COLUMNS, COL_FLIGHT_NBR),
        generate_index(COLUMNS, COL_ORIG_ICAO),
        generate_index(COLUMNS, COL_DEST_ICAO),
        generate_index(COLUMNS, COL_DEP_TIME),
        generate_foreign_key(COLUMNS, COL_AC_REG_NO, Aircraft, Aircraft.COL_REG_NO)
    ])

    def __init__(self,
                 flightNbr: str,
                 origIcao: str,
                 destIcao: str,
                 depTime: int,
                 arrTime: int,
                 acRegNo: str):
        self.flightNbr = flightNbr
        self.origIcao = origIcao
        self.destIcao = destIcao
        self.depTime = depTime
        self.arrTime = arrTime
        self.acRegNo = acRegNo
