from .success_msg_response import make_success_msg_response


def make_get_all_airline_flight_count_response(flight_counts: list) -> dict:
    response = make_success_msg_response()
    response["flightCounts"] = flight_counts
    return response
