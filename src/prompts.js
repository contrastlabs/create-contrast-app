import { developmentAreas, templates } from './templateInfos.js'

export function developmentAreaPrompt() {
  return {
    type: 'list',
    name: 'developmentArea',
    message: 'Choose a development area:',
    choices: developmentAreas,
  }
}

export function languagePrompt(developmentArea) {
  return {
    type: 'list',
    name: 'language',
    message: 'Choose a language to use:',
    choices: templates.reduce((acc, template) => {
      if (template.developmentArea === developmentArea) {
        if (!acc.includes(template.language)) {
          acc.push(template.language)
        }
      }

      return acc
    }, []),
  }
}

export function templatePrompt(developmentArea, language) {
  return {
    type: 'list',
    name: 'template',
    message: 'Choose a template to use:',
    choices: templates
      .filter(
        (template) =>
          template.developmentArea === developmentArea &&
          template.language === language,
      )
      .map((template) => ({
        name: `${template.name} - ${template.description}`,
        short: template.name,
        value: template.path,
        disabled: template.isDisabled,
      })),
  }
}

export function projectDirectoryPrompt() {
  return {
    type: 'input',
    name: 'projectDirectory',
    message: 'Enter the project directory:',
    transformer: (value) => value.toLowerCase().trim().replace(/\s+/g, '-'),
    validate: (value) => {
      if (!value) {
        return 'Project directory is required'
      }

      if (value.length < 3) {
        return 'Project directory is too short'
      }

      return true
    },
  }
}

export function confirmPrompt() {
  return {
    type: 'confirm',
    name: 'confirm',
    message: 'Do you want to create the project?',
    default: true,
  }
}
