// src/routes/countryRoutes.ts
import { Router } from 'express';
import { MainController } from '../controllers/mainController';
const mainController = new MainController();

const router = Router();

router.get('/countries', mainController.PaginatedCountriesData.bind(MainController));
router.get('/countries/:name', mainController.getInformationForCountry.bind(MainController));
router.get('/regions', mainController.getAllRegions.bind(MainController));
router.get('/languages', mainController.getAllLanguages.bind(MainController));
router.get('/statistics', mainController.getAllStatistics.bind(MainController));

export default router;