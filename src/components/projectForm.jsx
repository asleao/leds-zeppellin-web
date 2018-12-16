import React from "react";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import Form from "./common/form";
import { getLanguages } from "../services/languageService";
import auth from "../services/authService";

class ProjectForm extends Form {
  state = {
    data: { name: "", languageId: "" },
    languages: [],
    errors: {}
  };
  schema = {
    id: Joi.string(),
    name: Joi.string()
      .label("Nome")
      .required(),
    languageId: Joi.string()
      .label("Linguagem")
      .required()
  };

  async populateLanguages() {
    const { data: languages } = await getLanguages();
    this.setState({ languages });
  }

  async componentDidMount() {
    try {
      await this.populateLanguages();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        toast.error(ex.response.data.non_field_errors[0]);
        this.setState({ errors });
      }
      if (ex.response && ex.response.status === 401) {
        await auth.loginRefresh(auth.getJwtRefresh());
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Novo Projeto</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Nome")}
          {this.renderSelect("languageId", "Linguagem", this.state.languages)}
          {this.renderButton("Salvar")}
        </form>
      </div>
    );
  }
}

export default ProjectForm;
