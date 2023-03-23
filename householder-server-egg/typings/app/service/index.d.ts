// This file is created by egg-ts-helper@1.34.5
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportUserAdministrator = require('../../../app/service/user/administrator');
import ExportUserHouseholder = require('../../../app/service/user/householder');

declare module 'egg' {
  interface IService {
    user: {
      administrator: AutoInstanceType<typeof ExportUserAdministrator>;
      householder: AutoInstanceType<typeof ExportUserHouseholder>;
    }
  }
}
