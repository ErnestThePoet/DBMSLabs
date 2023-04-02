#### 添加航班
* 请求方法：POST
* 请求参数：表单
{
    flightNbr:string|null;
    origIcao:string|null;
    destIcao:string|null;
    depTime:number|null;
    arrTime:number|null;
    acRegNo:string|null;
    pilotId:string|null;
}
* 返回类型：json
* 返回格式：
{
	success:boolean;
	msg:string;
}

#### 删除航班
* 请求方法：DELETE
* 请求参数：
{
    flightNbr:string;
    origIcao:string;
    destIcao:string;
    depTime:number;
}
* 返回类型：json
* 返回格式：
{
	success:boolean;
	msg:string;
}

#### 获取所有航班信息
* 请求方法：GET
* 请求参数：
{}
* 返回类型：json
* 返回格式：
{
	success:boolean;
	msg:string;
    flights?:Array<{
        flightNbr:string;
        origIcao:string;
        destIcao:string;
        depTime:number;
        arrTime:number;
        regNo:string;
        acType:string;
        pilotIds:string;
        pilotNames:string;
    }>;
}

#### 获取航班管制员信息
* 请求方法：GET
* 请求参数：
{
    flightNbr: string;
}
* 返回类型：json
* 返回格式：
{
	success:boolean;
	msg:string;
    airControllers?:Array<{
        id:number;
        name:string;
        airportIcao:string;
    }>;
}

#### 获取各航司航班数量
* 请求方法：GET
* 请求参数：
{
    minCount:number;
}
* 返回类型：json
* 返回格式：
{
	success:boolean;
	msg:string;
    flightCounts?:Array<{
        icao:string;
        flightCount:number;
    }>;
}