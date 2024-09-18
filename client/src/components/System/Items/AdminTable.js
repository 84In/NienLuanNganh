import { CTable } from "@coreui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const AdminTable = ({ data }) => {
  if (!data == null) {
    return <div>No data available</div>; // Display a message or return null if there's no data
  }
  // Check if data and content exist
  const sampleData = data[0];

  // Dynamically build the columns from the sample data, excluding "id", and add "Edit" column
  const columns = Object.keys(sampleData)
    .filter((key) => key !== "id") // Exclude the "id" column
    .map((key) => {
      return { key, label: key.charAt(0).toUpperCase() + key.slice(1), _props: { scope: "col" } };
    });

  // Add the "Edit" column at the end
  columns.push({ key: "edit", label: "", _props: { scope: "col" } });

  // Build the rows (items), excluding the "id" field
  const items = data.map((user) => {
    const row = { class: "Default" };

    Object.keys(user)
      .filter((key) => key !== "id") // Exclude the "id" field from rows
      .forEach((key) => {
        if (key === "roles") {
          // Concatenate role names if the key is "roles"
          row[key] = user[key].map((role) => role.name).join(", ");
        } else {
          row[key] = user[key] != null ? user[key] : ""; // Fallback for null values
        }
      });

    // Add the "edit" field with the NavLink
    row["edit"] = (
      <NavLink className={"text-primary-color underline-offset-1"} to={`edit/${user.id}`}>
        Edit
      </NavLink>
    );

    return row;
  });

  return <CTable striped columns={columns} items={items} />;
};

export default AdminTable;
