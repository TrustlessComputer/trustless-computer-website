import { ReactNode, useMemo } from 'react';
import { default as BSTable, TableProps } from 'react-bootstrap/Table';
import cs from 'classnames';
import _camelCase from 'lodash/camelCase';
// import s from './styles.module.scss';
import Empty from '@/components/Empty';
import { StyledTable } from './Table.styled';

export type TColumn = {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: Record<string, any>;
  render: {
    [x: string]: ReactNode;
  };
};

interface IProps extends TableProps {
  data?: TColumn[];
  tableHead: ReactNode[];
  className?: string;
  classTableData?: string;
  classWrapper?: string;
}

const Table = ({ tableHead = [], data, className, classTableData, classWrapper, ...delegatedProps }: IProps) => {
  const TableHeads = useMemo((): React.ReactNode => {
    return (
      <thead className={'tableHead'}>
        <tr>
          {tableHead?.length > 0 &&
            tableHead.map((label, index) => (
              <th key={`thead-${index}`} className={cs('tableHead_item', _camelCase(label?.toString()))}>
                {label}
              </th>
            ))}
        </tr>
      </thead>
    );
  }, [tableHead]);

  const TableData = ({ rowData }: { rowData: TColumn }) => {
    return (
      <tr {...rowData.config} className={cs('tableData', classTableData)}>
        {rowData.render &&
          Object.entries(rowData.render).map(([key, value]) => (
            <td key={`tdata-${key}}`} className={'tableData_item'}>
              {value}
            </td>
          ))}
      </tr>
    );
  };

  return (
    <StyledTable>
      <div className={cs('wrapper', classWrapper)}>
        <BSTable bordered className={cs('table', className)} {...delegatedProps}>
          {TableHeads}

          {!data || data.length === 0 ? (
            <tbody className={'empty'}>
              <Empty isTable={true} />
            </tbody>
          ) : (
            <tbody>
              {data && data?.length > 0 && data.map(row => <TableData rowData={row} key={`trowData-${row.id}`} />)}
            </tbody>
          )}
        </BSTable>
      </div>
    </StyledTable>
  );
};

export default Table;
