export class ArmyList {
    name: string;
    units: Unit[];
    points: number;
}

export class Unit {
    name: string;
    unitType: string;
    unitOptions: UnitOption[];
    special: string[];
    unitUpgrades: UnitUpgrade[];
    isExpanded: boolean;
    artefact: Artefact;
    cs: number;
    tc: number;
    piercing: number;
}

export class UnitOption {
    unitSize: string;
    modelCount: number;
    sp: string;
    me: string;
    ra: string;
    de: string;
    at: string;
    nv: Nerve;
    pts: number;
}

export class Nerve {
    waver: string;
    route: string;
}

export class Artefact {
    id: string;
    name: string;
    pts: number;
    validTypes: string[];
    description: string;
}

export class UnitUpgrade {
    name: string;
    pts: number;
    isSelected: boolean;
    unitModifiers: Modifier[];
    unitOptionModifiers: Modifier[];
}

export class Modifier {
    element: string;
    newValue: any;
    action: string;

}

export class OutputDescription {
    name: string;
    desc: string;
}

export class DataLoader {
    name: string;
    file: string;
    id: string;
}

export class SpecialRule {
    id: string;
    name: string;
    desc: string;
}

export class Scenario {
    id: string;
    name: string;
    diceResult: number;
    description: string;
}

export class User {
    id: string;
    username: string;
    password: string;
    permissions: string[];
    savedListIDs: string[];
}