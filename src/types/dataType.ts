export interface Countries 
    {
        name: {
            common: string,
            official: string,
            nativeName?: {
                eng: {
                    official: string,
                    common: string
                },
                fra: {
                    official: string,
                    common: string
                },
                gsw: {
                    official: string,
                    common: string
                },
            }
        },
        tld: string [],
        cca2: string,
        ccn3: string,
        cca3: string,
        independent: boolean,
        status: string,
        unMember: boolean,
        currencies: {
            SHP: {
                name: string,
                symbol: string
            }
        },
        idd: {
            root: string,
            suffixes: string []
        },
        capital: string [],
        altSpellings: string [],
        region: string,
        subregion?: string,
        languages: {
            [key: string]: string;
        },
        translations? : {
            ara: { official: string; common: string };
            bre: { official: string; common: string };
            ces: { official: string; common: string };
            cym: { official: string; common: string };
            deu: { official: string; common: string };
            est: { official: string; common: string };
            fin: { official: string; common: string };
            fra: { official: string; common: string };
            hrv: { official: string; common: string };
            hun: { official: string; common: string };
            ita: { official: string; common: string };
            jpn: { official: string; common: string };
            kor: { official: string; common: string };
            nld: { official: string; common: string };
            per: { official: string; common: string };
            pol: { official: string; common: string };
            por: { official: string; common: string };
            rus: { official: string; common: string };
            slk: { official: string; common: string };
            spa: { official: string; common: string };
            srp: { official: string; common: string };
            swe: { official: string; common: string };
            tur: { official: string; common: string };
            urd: { official: string; common: string };
            zho: { official: string; common: string };
        },
        latlng: number[],
        landlocked: boolean,
        borders?: string[],
        area: number,
        demonyms?: {
            eng: {
                f: string,
                m: string
            }
        },
        flag: string,
        maps: {
            googleMaps: string,
            openStreetMaps: string
        },
        population: number,
        car: {
            signs: string[],
            side: string
        },
        timezones: string[],
        continents: string[],
        flags: {
            png: string,
            svg: string
        },
         coatOfArms: {
            png: string,
            svg: string
        },
        startOfWeek: string,
        capitalInfo: {
            latlng: number[]
        }
}

export interface Region {
    region: string;
    totalPopulation: number;
    countries: string [];
 }


export interface LanguageInfo {
    language: string;
    totalSpeakers: number;
    countries: string[];
  }
  
 
 export interface RegionsMap {
   [key: string]: Region;
 }

 export interface LanguageMap { [key: string]: LanguageInfo }





