import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, Company } from './models';

export const companySlice = createSlice({
  name: 'companies',
  initialState: {
    companies: [
      {
        id: '1',
        name: 'Company A',
        address: '123 Main St',
        employees: [
          {
            id: '11',
            name: 'A John',
            surname: 'Doe',
            post: 'Manager',
          },
          {
            id: '12',
            name: 'A Jane',
            surname: 'Smith',
            post: 'Developer',
          },
          {
            id: '13',
            name: 'A Michael',
            surname: 'Johnson',
            post: 'Designer',
          },
          {
            id: '14',
            name: 'A Emily',
            surname: 'Brown',
            post: 'Engineer',
          },
          {
            id: '15',
            name: 'A David',
            surname: 'Wilson',
            post: 'Analyst',
          },
        ],
      },
      {
        id: '2',
        name: 'Company B',
        address: '456 Main St',
        employees: [
          {
            id: '21',
            name: 'B Oliver',
            surname: 'Doe',
            post: 'Manager',
          },
          {
            id: '22',
            name: 'B Jack',
            surname: 'Smith',
            post: 'Developer',
          },
          {
            id: '23',
            name: 'B Harry',
            surname: 'Johnson',
            post: 'Designer',
          },
          {
            id: '24',
            name: 'B Jacob',
            surname: 'Brown',
            post: 'Engineer',
          },
          {
            id: '25',
            name: 'B Charley',
            surname: 'Wilson',
            post: 'Analyst',
          },
        ],
      },
      {
        id: '3',
        name: 'Company C',
        address: '789 Main St',
        employees: [
          {
            id: '31',
            name: 'C Thomas',
            surname: 'Doe',
            post: 'Manager',
          },
          {
            id: '32',
            name: 'C George',
            surname: 'Smith',
            post: 'Developer',
          },
          {
            id: '33',
            name: 'C Oscar',
            surname: 'Johnson',
            post: 'Designer',
          },
          {
            id: '34',
            name: 'C Harper',
            surname: 'Brown',
            post: 'Engineer',
          },
          {
            id: '35',
            name: 'C Sophia',
            surname: 'Wilson',
            post: 'Analyst',
          },
        ],
      },
      {
        id: '4',
        name: 'Company D',
        address: '012 Main St',
        employees: [
          {
            id: '41',
            name: 'D Sam',
            surname: 'Doe',
            post: 'Manager',
          },
          {
            id: '42',
            name: 'D Edwin',
            surname: 'Smith',
            post: 'Developer',
          },
          {
            id: '43',
            name: 'D Henry',
            surname: 'Johnson',
            post: 'Designer',
          },
          {
            id: '44',
            name: 'D Lola',
            surname: 'Brown',
            post: 'Engineer',
          },
          {
            id: '45',
            name: 'D Stella',
            surname: 'Wilson',
            post: 'Analyst',
          },
        ],
      },
      {
        id: '5',
        name: 'Company E',
        address: '345 Main St',
        employees: [
          {
            id: '51',
            name: 'E Regis',
            surname: 'Doe',
            post: 'Manager',
          },
          {
            id: '52',
            name: 'E Oberon',
            surname: 'Smith',
            post: 'Developer',
          },
          {
            id: '53',
            name: 'E Grover',
            surname: 'Johnson',
            post: 'Designer',
          },
          {
            id: '54',
            name: 'E Prescott',
            surname: 'Brown',
            post: 'Engineer',
          },
          {
            id: '55',
            name: 'E Antigone',
            surname: 'Wilson',
            post: 'Analyst',
          },
        ],
      },
    ],
    selectedComp: {} as Company,
  },
  reducers: {
    selectedComp: (state, action: PayloadAction<Company>) => {
      state.selectedComp = action.payload;
    },
    addCompany: (state) => {
      state.companies.push({
        id: (Number(state.companies.at(-1)?.id) + 1).toString(),
        name: '',
        address: '',
        employees: [],
      });
    },
    addEmployee: (state, action) => {
      const company = state.companies.find((company) => company.id === action.payload.id);
      if (company) {
        company.employees.push({
          id: (Number(company.employees.at(-1)?.id) + 1).toString(),
          name: '',
          surname: '',
          post: '',
        });
        console.log(company);
      }
    },
    deleteCompanies(state, action: PayloadAction<string[]>) {
      state.companies = state.companies.filter((row: Company) => !action.payload.includes(row.id));
    },
    deleteEmployees(state, action: PayloadAction<string[]>) {
      state.companies = state.companies.map((comp: Company) => {
        if (comp?.id === state.selectedComp?.id) {
          return {
            ...comp,
            employees: state.selectedComp.employees.filter(
              (row) => !action.payload.includes(row.id),
            ),
          };
        }
        return comp;
      });
    },
    updateCompaniesData(state, action: PayloadAction<{ id: string; col: string; value: string }>) {
      const { id, col, value } = action.payload;
      const itemToUpdate: Company | undefined = state.companies.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate[col] = value;
      }
    },
    updateEmployeesData(state, action: PayloadAction<{ id: string; col: string; value: string }>) {
      const { id, col, value } = action.payload;

      state.companies = state.companies.map((comp: Company) => {
        if (comp?.id === state.selectedComp?.id) {
          return {
            ...comp,
            employees: comp.employees.map((emp: Employee) => {
              if (emp?.id === id) {
                return {
                  ...emp,
                  [col]: value,
                };
              }
              return emp;
            }),
          };
        }
        return comp;
      });
    },
  },
});

export const {
  addCompany,
  addEmployee,
  deleteCompanies,
  deleteEmployees,
  selectedComp,
  updateCompaniesData,
  updateEmployeesData,
} = companySlice.actions;

export default companySlice.reducer;
