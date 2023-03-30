from .base.entity import *
from .flight import Flight
from .pilot import Pilot


@entity("pilot_flights")
class PilotFlight:
    COL_FLIGHT_NBR = 0
    COL_FLIGHT_ORIG_ICAO = 1
    COL_FLIGHT_DEST_ICAO = 2
    COL_FLIGHT_DEP_TIME = 3

    COL_PILOT_ID = 4

    COLUMNS = {
        COL_FLIGHT_NBR: ColumnMeta("flightNbr", Flight.COLUMNS[Flight.COL_FLIGHT_NBR].sql_type, "NOT NULL PRIMARY KEY"),
        COL_FLIGHT_ORIG_ICAO: ColumnMeta("flightOrigIcao", Flight.COLUMNS[Flight.COL_ORIG_ICAO].sql_type,
                                         "NOT NULL PRIMARY KEY"),
        COL_FLIGHT_DEST_ICAO: ColumnMeta("flightDestIcao", Flight.COLUMNS[Flight.COL_DEST_ICAO].sql_type,
                                         "NOT NULL PRIMARY KEY"),
        COL_FLIGHT_DEP_TIME: ColumnMeta("flightDepTime", Flight.COLUMNS[Flight.COL_DEP_TIME].sql_type,
                                        "NOT NULL PRIMARY KEY"),
        COL_PILOT_ID: ColumnMeta("pilotId", Pilot.COLUMNS[Pilot.COL_ID].sql_type, "NOT NULL PRIMARY KEY")
    }

    CREATE_TABLE_EXTRA = f"FOREIGN KEY ({COLUMNS[COL_FLIGHT_NBR].name}) REFERENCES {Flight.TABLE_NAME}({Flight.COLUMNS[Flight.COL_FLIGHT_NBR].name})," \
                         f"FOREIGN KEY ({COLUMNS[COL_FLIGHT_ORIG_ICAO].name}) REFERENCES {Flight.TABLE_NAME}({Flight.COLUMNS[Flight.COL_ORIG_ICAO].name})," \
                         f"FOREIGN KEY ({COLUMNS[COL_FLIGHT_DEST_ICAO].name}) REFERENCES {Flight.TABLE_NAME}({Flight.COLUMNS[Flight.COL_DEST_ICAO].name})," \
                         f"FOREIGN KEY ({COLUMNS[COL_FLIGHT_DEP_TIME].name}) REFERENCES {Flight.TABLE_NAME}({Flight.COLUMNS[Flight.COL_DEP_TIME].name})," \
                         f"FOREIGN KEY ({COLUMNS[COL_PILOT_ID].name}) REFERENCES {Pilot.TABLE_NAME}({Pilot.COLUMNS[Pilot.COL_ID].name})" \
 \
    def __init__(self,
                 flight_nbr: str,
                 flight_orig_icao: str,
                 flight_dest_icao: str,
                 flight_dep_time: int,
                 flight_arr_time: int,
                 pilot_id:int):
        self.flight_nbr = flight_nbr
        self.flight_orig_icao = flight_orig_icao
        self.flight_dest_icao = flight_dest_icao
        self.flight_dep_time = flight_dep_time
        self.flight_arr_time = flight_arr_time
        self.pilot_id = pilot_id
