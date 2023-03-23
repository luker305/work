// This file is created by egg-ts-helper@1.34.5
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportUserHouseholder = require('../../../app/model/user/householder');

declare module 'egg' {
  interface IModel {
    User: {
      Householder: ReturnType<typeof ExportUserHouseholder>;
    }
  }
}
