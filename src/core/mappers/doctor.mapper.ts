import { IDoctor } from "../entities/doctor.js";

export class DoctorMapper {
    static toDomain(raw: any): IDoctor {
        return {
            id: raw.id,
            phone: raw.phone,
            firstname: raw.firstname,
            lastname: raw.lastname,
            spec: raw.spec,
            slots: raw.slots.map((slot: Date) => slot.toISOString())
        };
    }

    static toPersistence(domain: any) {
        return {
            id: domain.id,
            phone: domain.phone,
            firstname: domain.firstname,
            lastname: domain.lastname,
            spec: domain.spec,
            slots: domain.slots.map((slot: string) => new Date(slot))
        };
    }
}