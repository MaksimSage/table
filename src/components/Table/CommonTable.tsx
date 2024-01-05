import React, { useState } from 'react';
import './style.css';
import { Company, Employee } from '../../store/models';
import Button from '../Button';

interface ITableProps {
  column: Array<{ key: string; isEdit: boolean }>;
  dataSource: Array<Company | Employee>;
  onChangeInput?: (id: string, col: string, value: string) => void;
  onRemove: (arr: string[]) => void;
  onAdd: () => void;
  title: string;
  onSelectComp?: (c: Company) => void;
}

const CommonTable = ({
  column,
  dataSource,
  onSelectComp,
  onChangeInput,
  onRemove,
  onAdd,
  title,
}: ITableProps) => {
  debugger;
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [editableCell, setEditableCell] = useState<{
    rowId: string;
    col: string;
  } | null>(null);
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allRowIds: string[] = dataSource.map((row) => row.id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const toggleSelectRow = (data: Company | Employee) => {
    selectAll && setSelectAll(false);

    if (selectedRows.includes(data.id)) {
      const rows: string[] = selectedRows.filter((id) => id !== data.id);
      setSelectedRows(rows);
    } else {
      setSelectedRows([...selectedRows, data.id]);
    }
  };

  const handleCellClick = (rowId: string, col: string) => {
    setEditableCell({ rowId, col });
  };

  const handleCellBlur = () => {
    setEditableCell(null);
  };

  return (
    <div>
      <h3 className={'title'}>{title}</h3>
      <div className="tableWrap">
        <table className="table">
          <thead>
            <tr>
              <th colSpan={column?.length + 1}>
                <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} /> Выделить
                Все
              </th>
            </tr>
          </thead>
          <tbody>
            {dataSource?.map((data: Company | Employee) => {
              return (
                <tr
                  key={`${data.id}-tr`}
                  onClick={() => {
                    toggleSelectRow(data);
                    if ('address' in data) {
                      onSelectComp?.(data as Company);
                    }
                  }}
                  className={selectedRows.includes(data.id) ? 'activeRow' : ''}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(data.id)}
                      onChange={() => toggleSelectRow(data)}
                    />
                  </td>
                  {column.map((col: { key: string; isEdit: boolean }) => (
                    <td
                      key={`${data.id}-${col.key}`}
                      onClick={(e) => e.preventDefault()}
                      onDoubleClick={() => {
                        col.isEdit && handleCellClick(data.id, col.key);
                      }}
                      onBlur={handleCellBlur}
                    >
                      {editableCell &&
                      editableCell.rowId === data.id &&
                      editableCell.col === col.key ? (
                        <input
                          className="inputTable"
                          type="text"
                          placeholder={col.key}
                          value={data[col.key]}
                          onChange={(e) => {
                            onChangeInput?.(data.id, col.key, e.target.value);
                          }}
                          onBlur={handleCellBlur}
                        />
                      ) : (
                        data[col.key]
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="actionBlock">
        {!!selectedRows.length && <Button title="Удалить" onClick={() => onRemove(selectedRows)} />}
        <Button title="Добавить" onClick={() => onAdd()} />
      </div>
    </div>
  );
};

export default CommonTable;
