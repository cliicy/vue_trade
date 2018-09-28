const Mock = require('mockjs');
import { assetAPI, generalAPI } from './accountmentAPI.mock';
import { priceChangeAPI } from './assetsAPI.mock';
import { exchangeFirstAPI, queryAccountIdAPI, strategyTypeAPI, symbolsAPI } from './exchangeID.mock';
import { loginAPI } from './user.mock';

Mock.mock(/\/account\/asset\/\d+/g, 'get', assetAPI);
Mock.mock(/\/account\/general\/\d+\/\d+\/\d+/g, 'get', generalAPI);
Mock.mock(/\/currency\/price_change\/0\/d+/g, 'get', priceChangeAPI);
Mock.mock('/exchange', 'get', exchangeFirstAPI);
Mock.mock(/\/account\/\d+/g, 'get', queryAccountIdAPI);
Mock.mock('/strategy', 'get', strategyTypeAPI);
Mock.mock('/symbol', 'get', symbolsAPI);
Mock.mock('/login', 'post', loginAPI);
