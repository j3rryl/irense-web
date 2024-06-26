import { User } from "@nextui-org/user";
import DRClassificationActions from "./drClassificationActions";

const columns = [
  // { name: "Row", uid: "id" },
  { name: "Eye Side", uid: "eyeSide" },
  { name: "Severity", uid: "severity" },
  { name: "Description", uid: "description" },
  { name: "Physician", uid: "physician" },
  { name: "Created At", uid: "createdAt" },
  { name: "Actions", uid: "actions" },
];

export const drClassificationRender = ({ row, columnKey }) => {
  const cellValue = row[columnKey];
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  switch (columnKey) {
    case "physician":
      return (
        <User
        className="capitalize"  
          name={`${cellValue?.firstName} ${cellValue?.lastName}`}
          description={columnKey}
          avatarProps={{
            src: cellValue?.image
          }}
        />
      );
    case "eyeSide":
      return (
        <span className="capitalize">{cellValue}</span>
      );
    case "createdAt":
      return (
        <span>{new Date(cellValue)?.toLocaleString("en-us", options)}</span>
      );
    case "actions":
      return <DRClassificationActions row={row}/>;
    default:
      return cellValue;
  }
};

export { columns };
