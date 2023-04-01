from .success_msg_response import make_success_msg_response


def make_get_air_controller_by_flight_nbr_response(air_controllers: list) -> dict:
    response = make_success_msg_response()
    response["airControllers"] = air_controllers
    return response
