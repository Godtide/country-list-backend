import { Request, Response, NextFunction } from 'express';
// import { ExternalAPIService } from "../integration/externalAPI";

import { Countries, Region, RegionsMap,LanguageMap, LanguageInfo } from '../types/dataType'; 
import axios from 'axios';
import { CustomError, generateError } from '../utils/errorUtils';
import { StatusCodes } from 'http-status-codes';
import { fetchCountriesData, fetchCountryData, fetchLanguageData, fetchRegionalData, fetchStatisticalData } from '../integration/externalAPI';




export class MainController {



/**
   * @swagger
   * /api/countries:
   *   get:
   *     summary: Retrieve a list of countries with pagination and optional filtering by region or population size
   *     description: Retrieve a list of countries data with pagaination with filter by region or population size
   *     tags:
   *       - Countries
   *     parameters:
   *       - in: query
   *         name: currentPage
   *         description: the current page of the countries to look up
   *         required: true
   *         type: string
   * 
   *       - in: query
   *         name: pageSize
   *         description: The number of countries in the page
   *         required: true
   *         type: string
   * 
   *       - in: query
   *         name: region
   *         description: The region of each country
   *         required: false
   *         type: string
   * 
   *       - in: query
   *         name: populationSize
   *         description: The populationsize of the country to be retrieved
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: Successful paginated response
   *       404:
   *         description: Invalid input format, consider adding the currentPage and pageSize
   *       500:
   *         description: Internal server error
   */    
async PaginatedCountriesData (req: Request, res: Response, next: NextFunction ) {
    try {
      const { currentPage, pageSize, region, populationSize } = req.query;

      if (!currentPage || !pageSize) {
        return res.status(400).json({ message: 'Current page and page size are required.' });
      }
      let paginatedCountries: any;
        if (typeof currentPage === 'string'  && pageSize === 'string' && region === 'string' || populationSize === 'string') {
          const pageNo = Number(currentPage);
          const pageSized = Number(pageSize);
          const regions = region?.toString();
          const populationSized = Number(populationSize);

          console.log(`paginated data ${pageNo} & ${pageSized}`)

          if(region){
            paginatedCountries = await fetchCountriesData(pageNo,pageSized,regions);
            const pagination = {
                currentPage,
                pageSize,
                paginatedCountries
               };
            res.status(200).json(pagination);

          }
          if(populationSized){
            paginatedCountries = await fetchCountriesData(pageNo,pageSized,undefined,populationSized); 
            const pagination = {
                currentPage,
                pageSize,
                paginatedCountries
               };
            res.status(200).json(pagination)
          }
         
      };
    //   if(!populationSized || !regions){

        console.log('Calling fetchCountriesData...');
        paginatedCountries = await fetchCountriesData(Number(currentPage), Number(pageSize));
        const pagination = {
            currentPage,
            pageSize,
            paginatedCountries
           };

        res.status(200).json(pagination);

    } catch (error) {
        console.log(`paginated data: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
      next(error);
    }
  }


/**
   * @swagger
   * /api/countries/{name}:
   *   get:
   *     summary: Get details for a particular country
   *     description: Get all details for a particular country including languages, population, area and bordering countries
   *     tags:
   *       - Countries
   *     parameters:
   *       - in: path
   *         name: name
   *         description: The name of the country to retrieve details for
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully fetched details for the country
   *       404:
   *         description: details not found for country
   *       500:
   *         description: Internal server error
   */
async getInformationForCountry(req: Request, res: Response, next: NextFunction) {
    try {
      const countryName = req.params.name;
     //retrieve the details for the particular country with name
      const countryDetails = await fetchCountryData(countryName);;

      // Return the info in the response
      res.status(200).json(countryDetails);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      next(error);
    }
  }


  /**
   * @swagger
   * /api/regions:
   *   get:
   *     summary: Get all regions
   *     description: Get a list of all regions
   *     tags:
   *       - Countries
   *     responses:
   *       200:
   *         description: Successfully fetched regions
   *       500:
   *         description: Internal server error
   */
  async getAllRegions(req: Request, res: Response, next: NextFunction) {
    try {
      const regionalData = await fetchRegionalData();
      res.status(200).json(regionalData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      next(error);
    }
  }

  /**
   * @swagger
   * /api/languages:
   *   get:
   *     summary: Get all languages
   *     description: Get a list of all languages and the countries where they're spoken
   *     tags:
   *       - Countries
   *     responses:
   *       200:
   *         description: Successfully fetched langauges
   *       500:
   *         description: Internal server error
   */
  async getAllLanguages(req: Request, res: Response, next: NextFunction) {
    try {
      const languageData = await fetchLanguageData();
      res.status(200).json(languageData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      next(error);
    }
  }

  /**
   * @swagger
   * /api/statistics:
   *   get:
   *     summary: aggregrated statistics
   *     description: Aggregated statistics such as total number of countries ,largest country by area e.t.c
   *     tags:
   *       - Countries
   *     responses:
   *       200:
   *         description: Successfully fetched statistics
   *       500:
   *         description: Internal server error
   */
  async getAllStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const statisticalData = await fetchStatisticalData();
      res.status(200).json(statisticalData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      next(error);
    }
  }


paginate(array: Countries[], currentPage: number, pageSize:number): Countries[] {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
  }
}
