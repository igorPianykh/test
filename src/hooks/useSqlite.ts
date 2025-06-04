import { useEffect, useState } from 'react';
import { open, DB } from '@op-engineering/op-sqlite';
import {
  createMeasurementsTableQuery,
  createUsersTableQuery,
} from '../services/database/queries.ts';

export const useSqlite = (): DB | null => {
  const [db, setDb] = useState<DB | null>(null);

  useEffect(() => {
    const initializeDatabase = () => {
      try {
        const database = open({ name: 'database.sqlite' });
        database.execute(createUsersTableQuery);
        database.execute(createMeasurementsTableQuery);
        setDb(database);
      } catch (e) {}
    };

    initializeDatabase();

    return () => {
      if (db) {
        db.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return db;
};
