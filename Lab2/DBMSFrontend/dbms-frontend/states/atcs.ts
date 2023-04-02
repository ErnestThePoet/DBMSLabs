import { makeAutoObservable } from "mobx";

export interface SingleAtc {
    id: number;
    name: string;
    airportIcao: string;
}

class Atcs {
    constructor() {
        makeAutoObservable(this);
    }

    atcs: SingleAtc[] = [];

    setAtcs(atcs: SingleAtc[]) {
        this.atcs = atcs;
    }
}

const atcs = new Atcs();

export default atcs;
