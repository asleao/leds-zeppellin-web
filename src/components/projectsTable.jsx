import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Table from "./common/table";

class ProjectsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Nome",
      content: project => (
        <Link to={`/projects/${project.id}`}>{project.name}</Link>
      )
    },
    { path: "owner.username", label: "Gestor" },
    { path: "language.name", label: "Linguagem" }
  ];

  deleteColumn = {
    key: "delete",
    content: project => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.props.onDelete(project)}
      >
        Delete
      </button>
    )
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { projects, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={projects}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ProjectsTable;
