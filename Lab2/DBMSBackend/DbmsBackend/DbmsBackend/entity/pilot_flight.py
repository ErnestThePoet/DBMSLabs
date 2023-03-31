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
                 flightNbr: str,
                 flightOrigIcao: str,
                 flightDestIcao: str,
                 flightDepTime: int,
                 pilotId: int):
        self.flightNbr = flightNbr
        self.flightOrigIcao = flightOrigIcao
        self.flightDestIcao = flightDestIcao
        self.flightDepTime = flightDepTime
        self.pilotId = pilotId
