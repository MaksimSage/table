import React from 'react';
import './App.css';
import CommonTable from './components/Table/CommonTable';
import {AppDispatch, Company, Employee, RootState} from './store/models';
import { useDispatch, useSelector } from 'react-redux';
import {
  addEmployee,
  selectedComp,
  addCompany,
  updateEmployeesData,
  updateCompaniesData,
  deleteEmployees,
  deleteCompanies,
} from './store/companySlice';

function App() {
  const columnComp: Array<{ key: string; isEdit: boolean }> = [
    { key: 'name', isEdit: true },
    {
      key: 'employeesCount',
      isEdit: false,
    },
    {
      key: 'address',
      isEdit: true,
    },
  ];
  const columnEmp: Array<{ key: string; isEdit: boolean }> = [
    { key: 'surname', isEdit: true },
    {
      key: 'name',
      isEdit: true,
    },
    { key: 'post', isEdit: true },
  ];

  const companies: Company[] = useSelector((state: RootState) => state.data.companies).map(
    (company) => ({
      ...company,
      employeesCount: company.employees.length,
    }),
  );
  const selected: Company = useSelector((state: RootState) => state.data.selectedComp);
  const employees: Employee[] =
    companies.find((company) => company.id === selected.id)?.employees ?? [];
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="App">
      <CommonTable
        column={columnComp}
        dataSource={companies}
        title="Список компаний"
        onChangeInput={(id, col, value) =>
          dispatch(
            updateCompaniesData({
              id,
              col,
              value,
            }),
          )
        }
        onSelectComp={(c: Company) => {
          dispatch(selectedComp(c));
        }}
        onAdd={() => dispatch(addCompany())}
        onRemove={(arrId: string[]) => dispatch(deleteCompanies(arrId))}
      />
      <CommonTable
        title="Список сотрудников"
        column={columnEmp}
        dataSource={employees}
        onChangeInput={(id, col, value) =>
          dispatch(
            updateEmployeesData({
              id,
              col,
              value,
            }),
          )
        }
        onRemove={(arrId: string[]) => dispatch(deleteEmployees(arrId))}
        onAdd={() => {
          dispatch(addEmployee(selected));
        }}
      />
    </div>
  );
}

export default App;
