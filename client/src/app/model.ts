export class ArmyList {
    name: string;
    units: Unit[];
}

export class Unit {
    name: string;
    type: string;
    unitOptions: UnitOption[];
    special: string[];
    isExpanded: boolean;
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
}

export class Nerve {
    waver: number;
    route: number;
}