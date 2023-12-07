import { User } from "@nextui-org/user";
import PhysicianActions from "./physicianActions";

const columns = [
  // { name: "Row", uid: "id" },
  { name: "Name", uid: "firstName" },
  { name: "Phone Number", uid: "phone" },
  { name: "Email", uid: "email" },
  { name: "Gender", uid: "gender" },
  { name: "Created At", uid: "createdAt" },
  { name: "Actions", uid: "actions" },
];

export const physicianRender = ({ row, columnKey }) => {
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
    case "firstName":
      return (
        <User
        classNames={{
          name: "capitalize",
          description: "!capitalize"
        }}
          name={`${row?.firstName} ${row?.lastName}`}
          description={`${row?.role?.toLowerCase()}`}
          avatarProps={{
            src: row?.image
          }}
        />
        // <span>{cellValue?.firstName}</span>
      );
    case "createdAt":
      return (
        <span>{new Date(cellValue)?.toLocaleString("en-us", options)}</span>
      );
    case "actions":
      return <PhysicianActions row={row}/>;
    default:
      return cellValue;
  }
};

export { columns };
