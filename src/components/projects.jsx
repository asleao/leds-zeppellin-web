import React, { Component } from "react";
import { Link } from "react-router-dom";
import { paginate } from "../utils/paginate";
import { getProjects, deleteProject } from "../services/projectService";
import Pagination from "./common/pagination";
import ProjectsTable from "./projectsTable";
import { toast } from "react-toastify";

import _ from "lodash";
import SearchBox from "./common/searchbox";

class Projects extends Component {
  state = {
    projects: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedTool: null,
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidMount() {
    const { data: projects } = await getProjects();
    this.setState({ projects });
  }

  handleDelete = async project => {
    const originalProjects = this.state.projects;
    const projects = originalProjects.filter(p => p.id !== project.id);
    this.setState({ projects });
    try {
      await deleteProject(project.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This project has already been deleted");
        this.setState({ originalProjects });
      }
    }
  };

  handleToolSelect = tool => {
    this.setState({ selectedTool: tool, searchQuery: "", currentPage: 1 });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedTool: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      projects: allProjects,
      selectedTool,
      searchQuery,
      sortColumn
    } = this.state;

    let filtered = allProjects;
    if (searchQuery)
      filtered = allProjects.filter(p =>
        p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedTool && selectedTool._id)
      filtered = allProjects.filter(p => p.tool === selectedTool);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const projects = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: projects };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: projects } = this.getPagedData();
    const { user } = this.props;
    return (
      <React.Fragment>
        {!user && (
          <React.Fragment>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <div className="row">
              <div className="col-10">
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
              </div>
              <div className="col-2">
                <Link
                  to="/projects/new"
                  className="form-control btn btn-primary"
                >
                  Novo Projeto
                </Link>
              </div>
            </div>
          </React.Fragment>
        )}

        <ProjectsTable
          sortColumn={sortColumn}
          projects={projects}
          onSort={this.handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Projects;
