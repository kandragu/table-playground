import React from 'react';
import '../../styles/index.scss';
type TableVariant = 'primary' | 'secondary';
interface Column {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
    type?: 'radio' | 'checkbox' | 'search' | undefined;
}
interface TableProps {
    data: Record<string, string | number>[];
    columns: Column[];
    radio?: boolean;
    checkbox?: boolean;
    variant?: TableVariant;
}
declare const Table: React.FC<TableProps>;
export default Table;
