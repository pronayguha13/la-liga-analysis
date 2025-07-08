import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableRow = { [key: string]: string | number };

type TableViewProps = {
  data: TableRow | TableRow[];
  title?: string;
  columns: string[];
};

const TableView = ({ columns, data, title = "" }: TableViewProps) => {
  const getTableRow = () => {
    if (Array.isArray(data)) {
      if (!data.length) return <TableRow></TableRow>;
      return data.map((row) => {
        return (
          <TableRow>
            {Object.entries(row).map((cell, index) => (
              <TableCell key={index}>{cell[1]}</TableCell>
            ))}
          </TableRow>
        );
      });
    } else {
      return (
        <TableRow>
          {Object.entries(data).map((cell, index) => (
            <TableCell key={index}>{cell[1]}</TableCell>
          ))}
        </TableRow>
      );
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* <TableHead className="w-[12ch]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead> */}
          {columns.map((column, index) => (
            <TableHead key={index}>{column.toLocaleUpperCase()}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{getTableRow()}</TableBody>
    </Table>
  );
};

export default TableView;
