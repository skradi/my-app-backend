import {AdRecord} from "../records/ad.record";


// tu sobie robimy domyslny obiekt ktory bedziemy sobie testowacm i czesto uzywac wiec zeby nie powtarzac kodu piszemy go na samej gorze
const defaultObj = {
    name: 'Test Name',
    description: 'blah',
    url: 'https://megak.pl',
    price: 0,
    lat: 9,
    lon: 9,
};

// tu sobie testujemy czy te rzeczy sie tworza i czy name jest ok
test('Can build AdRecord', () => {
    const ad = new AdRecord(defaultObj,);

    expect(ad.name).toBe("Test Name");
    expect(ad.description).toBe("blah");
});

// tu sprawdzamy czy cena jesli podana jest zla
test('Validates invalid prcie', () => {


    expect(() => new AdRecord({
        ...defaultObj,
        price: -3,
    })).toThrow('Cena nie moze byc mniejsza niz 0 lub wieksza niz 9 9999 999')

});

