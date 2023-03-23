// This file is created by egg-ts-helper@1.34.5
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportUserCommon = require('../../../app/controller/user/common');
import ExportUserHouseholder = require('../../../app/controller/user/householder');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    user: {
      common: ExportUserCommon;
      householder: ExportUserHouseholder;
    }
  }
}
