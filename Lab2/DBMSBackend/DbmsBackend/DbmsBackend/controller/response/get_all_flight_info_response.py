from .success_msg_response import make_success_msg_response


def make_get_all_flight_info_response(flights: list) -> dict:
    response = make_success_msg_response()
    response["flights"] = flights
    return response
