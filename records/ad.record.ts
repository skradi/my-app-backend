import {AdEntity, NewAdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

type AdRecordResults = [AdEntity[], FieldPacket[]];

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

        if (!obj.url || obj.url.length > 100) {
            throw new ValidationError('Link ogloszenia nie moze byc pusty ani przekraczac 100 znakow');
        }

        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie mozna zlokalizowac ogloszenia');
        }
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    };

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE id = :id", {
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new AdRecord(results[0])
    }

    // w tej metodzie uzywamy %% w naszym placeholderze chodzi o to ze % zastepuje kazdy mozliwy symbol wiec jesli szukamy jakiejs nazwy i wpiszemy w wyszukiwarke  'om' to ma znalez wszystkie pasujace nazwy  np  dom  komoda  bomba

    static async findAll(name: string): Promise<SimpleAdEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as AdRecordResults;

        return results.map(result => {
            const {
                id, lat, lon,
            } = result;

            return {
                id, lat, lon,
            }
        });
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted');
        }

        await pool.execute("INSERT INTO `ads`(`id`,`name`,`description`,`price`,`url`,`lat`,`lon`) VALUES(:id, :name, :description, :price, :url, :lat, :lon)", this)
    }
}