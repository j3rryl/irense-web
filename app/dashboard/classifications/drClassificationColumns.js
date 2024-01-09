import { User } from "@nextui-org/user";
import DRClassificationActions from "./drClassificationActions";
import { Chip } from "@nextui-org/chip";

const columns = [
  // { name: "Row", uid: "id" },
  { name: "Eye Side", uid: "eyeSide" },
  { name: "Severity", uid: "severity" },
  { name: "Description", uid: "description" },
  { name: "Physician", uid: "physician" },
  { name: "Patient", uid: "patient" },
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
    case "patient":
    case "physician":
      return (
        <User
          className="capitalize"
          name={`${cellValue?.firstName} ${cellValue?.lastName}`}
          description={columnKey}
          avatarProps={{
            src: cellValue?.image,
          }}
        />
        // <span>{cellValue?.firstName}</span>
      );
    case "severity":
      return (
        <Chip
          color={
            cellValue === "Normal"
              ? "primary"
              : cellValue === "Mild"
              ? "default"
              : cellValue === "Moderate"
              ? "secondary"
              : cellValue === "Severe"
              ? "warning"
              : "danger"
          }
        >
          {cellValue}
        </Chip>
      );
    case "eyeSide":
      return <span className="capitalize">{cellValue}</span>;
    case "createdAt":
      return (
        <span>{new Date(cellValue)?.toLocaleString("en-us", options)}</span>
      );
    case "actions":
      return <DRClassificationActions row={row} />;
    default:
      return <span>{cellValue}</span>;
  }
};

export { columns };
