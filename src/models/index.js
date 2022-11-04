import {createRealmContext} from '@realm/react';
import {Finances} from './Finances';

export const FinancesRealmContext = createRealmContext({
  schema: [Finances],
});
