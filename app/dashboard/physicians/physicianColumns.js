import PhysicianActions from "./physicianActions";

const columns = [
  // { name: "Row", uid: "id" },
  { name: "First Name", uid: "firstName" },
  { name: "Last Name", uid: "lastName" },
  { name: "Phone Number", uid: "phone" },
  { name: "Email", uid: "email" },
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
    case "countyName":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {row.county}
          </p>
        </div>
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
