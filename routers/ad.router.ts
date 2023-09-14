import {Router} from "express";
import {AdRecord} from "../records/ad.record";


export const adRouter = Router()

    .get('/search/:name?', async (req, res) => {

        console.log(req.params.name, 'jesli nic nie podamy to nasz parametr name przyjdzie do nas w requescie jako undefined');

        const ads = await AdRecord.findAll(req.params.name ?? '');

        console.log(ads);
        res.json(ads)
    })

    .get('/:id', async (req, res) => {
        const ad = await AdRecord.getOne(req.params.id);

        res.json(ad);
    })

    .post('/', async (req, res) => {
        const ad = new AdRecord(req.body);
        await ad.insert();
        res.json(ad);
    })