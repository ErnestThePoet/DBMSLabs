from .base.entity import *


@entity("ac_manufacturers")
class AcManufacturer:
    COL_NAME = 0

    COLUMNS = {
        COL_NAME: ColumnMeta("name", "VARCHAR(20)", "NOT NULL PRIMARY KEY")
    }

    def __init__(self, name: str):
        self.name = name
