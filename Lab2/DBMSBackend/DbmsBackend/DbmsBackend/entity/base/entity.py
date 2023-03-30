def entity(table_name: str):
    def entity_decorator(entity_class):
        if "COLUMNS" not in entity_class.__dict__:
            raise RuntimeError(f"{entity_class} did not contain a 'COLUMNS' property. Check your implementation.")
        entity_class.TABLE_NAME = table_name
        return entity_class

    return entity_decorator


class ColumnMeta:
    def __init__(self, name: str, sql_type: str, extra: str = ""):
        self.name = name
        self.sql_type = sql_type
        self.extra = extra


def generate_composite_primary_key(columns, cols: list[int]):
    return f"PRIMARY KEY ({','.join(map(lambda x: columns[x].name, cols))})"


def generate_foreign_key(columns, col: int, ref_entity_class, ref_col: int):
    return f"FOREIGN KEY ({columns[col].name}) " \
           f"REFERENCES {ref_entity_class.TABLE_NAME}({ref_entity_class.COLUMNS[ref_col].name})"


def _generate_index(index_type: str, col_name: str, length: int):
    return f"{index_type} ({col_name}{'' if length is None else f'({length})'})"


def generate_index(columns, col: int, length: int = None):
    return _generate_index("INDEX", columns[col].name, length)


def generate_unique(columns, col: int, length: int = None):
    return _generate_index("UNIQUE", columns[col].name, length)


def join_create_table_extra(extras: list[str]):
    return ",".join(extras)
