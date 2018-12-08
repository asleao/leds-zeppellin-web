import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class ProjectForm extends Form {
  state = {
    data: { name: "", tools: "", team: "", owner: "", language: "" },
    errors: {}
  };
  schema = {
    id: Joi.string(),
    name: Joi.string()
      .label("Nome")
      .required(),
    toolsId: Joi.string()
      .label("Ferramenta")
      .required(),
    teamId: Joi.string()
      .label("Equipe")
      .required(),
    owner: Joi.string()
      .min(0)
      .max(10)
      .label("Rate")
      .required()
  };
  render() {
    return (
      <div>
        <h1>Novo Projeto</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Nome")}
          {this.renderButton("Salvar")}
        </form>
      </div>
    );
  }
}

export default ProjectForm;
