import { Countries, Region, RegionsMap,LanguageMap, LanguageInfo } from '../types/dataType'; 
import axios from 'axios';
import { CustomError, generateError } from '../utils/errorUtils';
import { StatusCodes } from 'http-status-codes';

export const fetchAllCountriesData= async() =>{
    let url = "https://restcountries.com/v3.1/all"
  try {
    const response = await axios.get(url);
    const data = await response.data as Countries[];
  return data;
  } catch(error){
    console.error(`unable to fetch data for countries:`, error);

    const errorResponse: CustomError = generateError(StatusCodes.FAILED_DEPENDENCY,'unable to fetch countries data:' );
    return errorResponse;
  }
}

export const fetchCountriesData = async(currentPage: number, pageSize:number, region?: string, populationSize?:number) =>{
  try {

    const countriesData = await fetchAllCountriesData() as Countries[];

    const paginatedData = paginate(countriesData, currentPage, pageSize);

    if(region){
    const regionalized =   paginatedData.filter((location) => location.region===region);
    return regionalized
    }

    if (populationSize){
    const populationSized = paginatedData.filter((population) => population.population === populationSize);
    return populationSized
    }

    return paginatedData
} catch (error) {
  console.log(error)
//   if (!response.data) {
    throw new Error('Network response was not ok');
//   }
}
}


export const fetchCountryData= async (countryName: string): Promise<Countries | CustomError> =>{
    let url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  try {
    const response = await axios.get(url);
    const data = await response.data as Countries;
    console.log(data);
    return data;
   
  } catch (error) {
    console.error(`unable to fetch data for country with name: ${countryName}:`, error);

    const errorResponse: CustomError = generateError(StatusCodes.FAILED_DEPENDENCY,'unable to fetch country data:' );
    return errorResponse;
  };
}


export const fetchRegionalData = async() =>{
    try {
        const countriesData = await fetchAllCountriesData() as Countries[];
    
      const regionsMap: RegionsMap = countriesData.reduce((acc: RegionsMap, country: Countries) => {
        if (!acc[country.region]) {
          acc[country.region] = {
            region: country.region,
            totalPopulation: 0,
            countries: [],
          };
        }
        acc[country.region].countries.push( country.name.common );
        acc[country.region].totalPopulation += country.population;
        return acc;
      }, {});
  
      const regions: Region[] = Object.values(regionsMap);
      return regions;
   
  } catch (error) {
    console.error('unable to fetch regional data:', error);
    const errorResponse: CustomError = generateError(StatusCodes.FAILED_DEPENDENCY,'unable to fetch countries data:' );
    return errorResponse;
  };
}


export const fetchLanguageData = async() =>{
    try {
    const countriesData = await fetchAllCountriesData() as Countries[];
    
      const languageMap: { [key: string]: LanguageInfo } = {};

      countriesData?.forEach(country => {
        const countryName = country?.name;
        const countryPopulation = country?.population;
  

        if (country?.languages && countryPopulation !== undefined) {
        Object.keys(country?.languages).forEach(languageCode => {
          const language = country?.languages[languageCode];
  
          if (!languageMap[language]) {
            languageMap[language] = {
              language: language,
              totalSpeakers: 0,
              countries: [],
            };
          }
  
          languageMap[language].totalSpeakers += countryPopulation;
          languageMap[language].countries.push(countryName?.common);
        });
       }
      });
      const languages: LanguageInfo[] = Object.values(languageMap);
     
      return languages
   
  } catch (error) {

    console.error('unable to fetch languages data:', error);
    const errorResponse: CustomError = generateError(StatusCodes.FAILED_DEPENDENCY,'unable to fetch languages data:' );
    return errorResponse;
  };
}


export const fetchStatisticalData= async() =>{
    try {
    const countriesData = await fetchAllCountriesData() as Countries[];

      const totalCountries = countriesData.length;
    
      const largestCountry = countriesData.reduce((max, country) => country.area > max.area ? country : max, countriesData[0]);
      const smallestCountry = countriesData.reduce((min, country) => country.population < min.population ? country : min, countriesData[0]);
        
    const languageMap: { [key: string]: number } = {};

    countriesData.forEach(country => {
      const countryPopulation = country.population;
      if (country?.languages && countryPopulation !== undefined) {
      Object.keys(country.languages).forEach(languageCode => {
        const language = country.languages[languageCode];

        if (!languageMap[language]) {
          languageMap[language] = 0;
        }

        languageMap[language] += countryPopulation;
      });
    }
    });

    const mostWidelySpokenLanguage = Object.keys(languageMap).reduce((a, b) => languageMap[a] > languageMap[b] ? a : b);

    const statistics = {
      totalCountries,
      largestCountry: { name: largestCountry.name, area: largestCountry.area },
      smallestCountry: { name: smallestCountry.name, population: smallestCountry.population },
      mostWidelySpokenLanguage
    };

    return statistics;
  } catch (error) {

    console.error('unable to fetch countries statistical data:', error);
    const errorResponse: CustomError = generateError(StatusCodes.FAILED_DEPENDENCY,'unable to fetch countries statistical data:' );
    return errorResponse;
  };
}


export const paginate = (array: Countries[], currentPage: number, pageSize:number): Countries[] =>{
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}
