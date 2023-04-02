from ..entity.entities import *
from ..controller.response.success_msg_response import make_success_msg_response
from ..controller.response.get_air_controller_by_flight_nbr_response import \
    make_get_air_controller_by_flight_nbr_response
from ..controller.response.get_all_airline_flight_count_response import make_get_all_airline_flight_count_response
from ..controller.response.get_all_flight_info_response import make_get_all_flight_info_response
from ..dao.comprehensive_repository import ComprehensiveRepository


class ComprehensiveService:
    def __init__(self):
        self.comprehensive_repository = ComprehensiveRepository()

    def add_flight(self, flight: Flight, pilot_id: int):
        try:
            self.comprehensive_repository.add_flight(flight, pilot_id)
        except Exception as e:
            return make_success_msg_response(str(e))

        return make_success_msg_response()

    def delete_flight(self,
                      flight_nbr: str,
                      orig_icao: str,
                      dest_icao: str,
                      dep_time: int):
        try:
            self.comprehensive_repository.delete_pilot_flight(flight_nbr,
                                                              orig_icao,
                                                              dest_icao,
                                                              dep_time)
            self.comprehensive_repository.delete_flight(flight_nbr,
                                                        orig_icao,
                                                        dest_icao,
                                                        dep_time)
        except Exception as e:
            return make_success_msg_response(str(e))

        return make_success_msg_response()

    def get_all_flight_info(self):
        try:
            return make_get_all_flight_info_response(
                self.comprehensive_repository.get_all_flight_info())
        except Exception as e:
            return make_success_msg_response(str(e))

    def get_air_controller_by_flight_nbr(self, flight_nbr: str):
        try:
            return make_get_air_controller_by_flight_nbr_response(
                self.comprehensive_repository.get_air_controller_by_flight_nbr(flight_nbr))
        except Exception as e:
            return make_success_msg_response(str(e))

    def get_all_airline_flight_count(self, min_count: int):
        try:
            return make_get_all_airline_flight_count_response(
                self.comprehensive_repository.get_all_airline_flight_count(min_count))
        except Exception as e:
            return make_success_msg_response(str(e))
