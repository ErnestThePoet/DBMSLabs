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
                 flight_nbr: str,
                 orig_icao: str,
                 dest_icao: str,
                 dep_time: int,
                 arr_time: int,
                 ac_reg_no: str):
        self.flight_nbr = flight_nbr
        self.orig_icao = orig_icao
        self.dest_icao = dest_icao
        self.dep_time = dep_time
        self.arr_time = arr_time
        self.ac_reg_no = ac_reg_no
