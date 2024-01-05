import { store } from './index';

type Common = { [key: string]: any };

export interface Company extends Common {
  id: string;
  name: string;
  address: string;
  employees: Employee[] | [];
}

export interface Employee extends Common {
  id: string;
  name: string;
  surname: string;
  post: string;
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
