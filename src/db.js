// @flow

import low from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';
import config from './config';

type Id = string;
type Noon = Date;
type User = {
  lang: 'fr' | 'en' | 'both',
  slug: string,
  firstname: string,
  name: string,
  uniqueid: string,
  email: string,
  lastSeen: string,
  reminder: boolean,
};

function injectOps(db: Object): Object {
  /* eslint-disable no-param-reassign */

  db.getUser = async (uniqueid: Id): Promise<Object> => db.get(['users', uniqueid]).value();

  db.getUsers = async (uniqueids: Array<Id>): Promise<Array<Object>> =>
    uniqueids.map(uniqueid => db.get(['users', uniqueid]).value());

  db.updateUser = async (uniqueid: Id, values: Object): Promise<void> => {
    const oldValues = await db.getUser(uniqueid);
    return db
      .set(['users', uniqueid], {
        lang: 'both',
        reminder: true,
        ...oldValues,
        ...values,
      })
      .write();
  };

  db.getMiam = async (noon: Noon): Promise<Array<Object>> => db.get(['miams', noon.toISOString()]).value();

  db.updateMiam = async (noon: Noon, values: Object): Promise<void> => {
    const oldValues = await db.getMiam(noon);
    return db
      .set(['miams', noon.toISOString()], {
        ...oldValues,
        ...values,
      })
      .write();
  };

  db.getReminderUsers = async (): Promise<Array<string>> =>
    db
      .get('users')
      .filter(u => u.reminder)
      .value();

  /* eslint-enable no-param-reassign */
  return db;
}

function lowdbFactory(): Promise<Object> {
  const file = new FileAsync(config.lowdb.file);
  return low(file).then(db => {
    db.defaults(config.lowdb.defaults).write();
    return injectOps(db);
  });
}

export default lowdbFactory;
export type { User };
