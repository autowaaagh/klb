export class ArmyList {
    name: string;
    units: Unit[];
}

export class Unit {
    name: string;
    type: string;
    unitOptions: UnitOption[];
}

export class UnitOption {
    unitSize: string;
    modelCount: number;
    sp: number;
    me: number;
    ra: number;
    de: number;
    at: number;
    nv: Nerve;
    pts: number;
    special: string[];
}

export class Nerve {
    waver: number;
    route: number;
}