import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..entity.entities import *
from ..service.comprehensive_service import ComprehensiveService

PRINT_REQUEST = True


class ComprehensiveController:
    def __init__(self):
        self.comprehensive_service = ComprehensiveService()

    @csrf_exempt
    def add_flight(self, request):
        request_obj = json.loads(request.body.decode("utf-8"))
        if PRINT_REQUEST:
            print("add_flight", request_obj)
        return JsonResponse(self.comprehensive_service.add_flight(
            Flight(
                request_obj["flightNbr"],
                request_obj["origIcao"],
                request_obj["destIcao"],
                request_obj["depTime"],
                request_obj["arrTime"],
                request_obj["acRegNo"]
            ),
            request_obj["pilotId"]))

    @csrf_exempt
    def delete_flight(self, request):
        if PRINT_REQUEST:
            print("delete_flight", request.DELETE)
        return JsonResponse(self.comprehensive_service.delete_flight(
            request.DELETE["flightNbr"],
            request.DELETE["origIcao"],
            request.DELETE["destIcao"],
            request.DELETE["depTime"]))

    @csrf_exempt
    def get_all_flight_info(self, request):
        if PRINT_REQUEST:
            print("get_all_flight_info", request.GET)
        return JsonResponse(self.comprehensive_service.get_all_flight_info())

    @csrf_exempt
    def get_air_controller_by_flight_nbr(self, request):
        if PRINT_REQUEST:
            print("get_air_controller_by_flight_nbr", request.GET)
        return JsonResponse(self.comprehensive_service.get_air_controller_by_flight_nbr(
            request.GET["flightNbr"]
        ))

    @csrf_exempt
    def get_all_airline_flight_count(self, request):
        if PRINT_REQUEST:
            print("get_all_airline_flight_count", request.GET)
        return JsonResponse(self.comprehensive_service.get_all_airline_flight_count())
