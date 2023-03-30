def generate_create_table(entity_class):
    sql_prefix = f"CREATE TABLE IF NOT EXISTS {entity_class.TABLE_NAME} ("
    sql_columns = ",".join([f"{entity_class.COLUMNS[x].name} "
                            f"{entity_class.COLUMNS[x].sql_type} "
                            f"{entity_class.COLUMNS[x].extra} "
                            for x in entity_class.COLUMNS])
    sql_suffix = f"{','+entity_class.CREATE_TABLE_EXTRA if 'CREATE_TABLE_EXTRA' in entity_class.__dict__ else ''});"
    return sql_prefix+sql_columns+sql_suffix
