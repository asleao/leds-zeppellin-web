import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getLanguages } from "../services/languageService";

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
    await this.populateLanguages();
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
