from .base.entity import *
from .aircraft import Aircraft


@entity("fdrs")
class Fdr:
    COL_ID = 0
    COL_AC_REG_NO = 1

    COLUMNS = {
        COL_ID: ColumnMeta("id", "INT", "NOT NULL PRIMARY KEY"),
        COL_AC_REG_NO: ColumnMeta("acRegNo", Aircraft.COLUMNS[Aircraft.COL_REG_NO].sql_type),
    }

    CREATE_TABLE_EXTRA = join_create_table_extra([
        generate_foreign_key(COLUMNS, COL_AC_REG_NO, Aircraft, Aircraft.COL_REG_NO)
    ])

    def __init__(self, id: int, ac_reg_no: str):
        self.id = id
        self.acRegNo = ac_reg_no
