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
        COL_FLIGHT_NBR: ColumnMeta("flightNbr", Flight.COLUMNS[Flight.COL_FLIGHT_NBR].sql_type, "NOT NULL"),
        COL_FLIGHT_ORIG_ICAO: ColumnMeta("flightOrigIcao", Flight.COLUMNS[Flight.COL_ORIG_ICAO].sql_type,
                                         "NOT NULL"),
        COL_FLIGHT_DEST_ICAO: ColumnMeta("flightDestIcao", Flight.COLUMNS[Flight.COL_DEST_ICAO].sql_type,
                                         "NOT NULL"),
        COL_FLIGHT_DEP_TIME: ColumnMeta("flightDepTime", Flight.COLUMNS[Flight.COL_DEP_TIME].sql_type,
                                        "NOT NULL"),
        COL_PILOT_ID: ColumnMeta("pilotId", Pilot.COLUMNS[Pilot.COL_ID].sql_type, "NOT NULL")
    }

    CREATE_TABLE_EXTRA = join_create_table_extra([
        generate_composite_primary_key(COLUMNS,
                                       [COL_FLIGHT_NBR, COL_FLIGHT_ORIG_ICAO, COL_FLIGHT_DEST_ICAO, COL_FLIGHT_DEP_TIME,
                                        COL_PILOT_ID]),
        generate_foreign_key(COLUMNS, COL_FLIGHT_NBR, Flight, Flight.COL_FLIGHT_NBR),
        generate_foreign_key(COLUMNS, COL_FLIGHT_ORIG_ICAO, Flight, Flight.COL_ORIG_ICAO),
        generate_foreign_key(COLUMNS, COL_FLIGHT_DEST_ICAO, Flight, Flight.COL_DEST_ICAO),
        generate_foreign_key(COLUMNS, COL_FLIGHT_DEP_TIME, Flight, Flight.COL_DEP_TIME),
        generate_foreign_key(COLUMNS, COL_PILOT_ID, Pilot, Pilot.COL_ID)
    ])

    def __init__(self,
                 flight_nbr: str,
                 flight_orig_icao: str,
                 flight_dest_icao: str,
                 flight_dep_time: int,
                 flight_arr_time: int,
                 pilot_id: int):
        self.flight_nbr = flight_nbr
        self.flight_orig_icao = flight_orig_icao
        self.flight_dest_icao = flight_dest_icao
        self.flight_dep_time = flight_dep_time
        self.flight_arr_time = flight_arr_time
        self.pilot_id = pilot_id
