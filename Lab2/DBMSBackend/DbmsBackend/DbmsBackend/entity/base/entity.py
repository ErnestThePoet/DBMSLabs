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
