from ..entity.entities import *
from ..controller.response.success_msg_response import make_success_msg_response
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
                      flightNbr: str,
                      origIcao: str,
                      destIcao: str,
                      depTime: int):
        try:
            self.comprehensive_repository.delete_flight(flightNbr,
                                                        origIcao,
                                                        destIcao,
                                                        depTime)
        except Exception as e:
            return make_success_msg_response(str(e))

        return make_success_msg_response()

    def get_all_flight_info(self):
        try:
            self.comprehensive_repository.get_all_flight_info()
        except Exception as e:
            return make_success_msg_response(str(e))

        return make_success_msg_response()

    def get_air_controller_by_flight_nbr(self, flight_nbr: str):
        try:
            self.comprehensive_repository.get_air_controller_by_flight_nbr(flight_nbr)
        except Exception as e:
            return make_success_msg_response(str(e))

        return make_success_msg_response()

    def get_all_airline_flight_count(self):
        try:
            self.comprehensive_repository.get_all_airline_flight_count()
        except Exception as e:
            return make_success_msg_response(str(e))

        return make_success_msg_response()

