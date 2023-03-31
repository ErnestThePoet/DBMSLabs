def generate_create_table_sql(entity_class):
    prefix = f"CREATE TABLE IF NOT EXISTS {entity_class.TABLE_NAME} ("
    cols = ",".join([f"{entity_class.COLUMNS[x].name} "
                     f"{entity_class.COLUMNS[x].sql_type} "
                     f"{entity_class.COLUMNS[x].extra} "
                     for x in entity_class.COLUMNS])
    suffix = f"{',' + entity_class.CREATE_TABLE_EXTRA if 'CREATE_TABLE_EXTRA' in entity_class.__dict__ else ''});"
    return prefix + cols + suffix


def generate_insert_sql(entity):
    col_names = ",".join([entity.COLUMNS[x].name for x in entity.COLUMNS])

    values = []
    for col in entity.COLUMNS:
        value = entity.__dict__[entity.COLUMNS[col].name]
        if value is None:
            values.append("NULL")
        else:
            values.append(f"'{value}'"
                          if ("CHAR" in entity.COLUMNS[col].sql_type.upper()
                              or entity.COLUMNS[col].sql_type.upper() == "TEXT")
                          else str(value))

    return f"INSERT INTO {entity.TABLE_NAME} ({col_names}) VALUES ({','.join(values)});"
