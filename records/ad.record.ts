import {AdEntity} from "../types";
import {ValidationError} from "../utils/errors";

interface NewAdEntity extends Omit<AdEntity, 'id'> {
    id?: string;
}
export class AdRecord implements AdEntity {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;
    constructor(obj: NewAdEntity) {
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta ani przekraczac 100 znaków');
        }

        if (obj.description.length > 1000) {
            throw new ValidationError('Treść ogłoszenia nie moze byc pusta, ani przekraczac 1000 znaków');
        }

        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie moze byc mniejsza niz 0 lub wieksza niz 9 9999 999');
        }

        // @TODO: check if url is valid!

        if (!obj.url  || obj.url.length > 100) {
            throw new ValidationError('Link ogloszenia nie moze byc pusty ani przekraczac 100 znakow');
        }

        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie mozna zlokalizowac ogloszenia');
        }

        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    };
}