#!/usr/bin/env node

import { join, resolve } from 'node:path'
import { createColors } from 'colorette'
import { Command } from 'commander'
import fse from 'fs-extra'
import inquirer from 'inquirer'

import {
  confirmPrompt,
  developmentAreaPrompt,
  languagePrompt,
  projectDirectoryPrompt,
  templatePrompt,
} from './prompts.js'

const colors = createColors()

const program = new Command()

program
  .version('1.0.0')
  .description('CLI to create projects from templates')
  .action(async () => {
    const { developmentArea } = await inquirer.prompt([developmentAreaPrompt()])

    const { language } = await inquirer.prompt([
      languagePrompt(developmentArea),
    ])

    const { template, projectDirectory, confirm } = await inquirer.prompt([
      templatePrompt(developmentArea, language),
      projectDirectoryPrompt(),
      confirmPrompt(),
    ])

    if (!confirm) {
      console.log(colors.yellow('Operation canceled!'))

      return
    }

    const templatesDir = join(__dirname, '../templates')

    const templateDir = join(templatesDir, template)

    const targetDir = resolve(
      process.cwd(),
      projectDirectory.toLowerCase().trim().replace(/\s+/g, '-'),
    )

    try {
      await fse.copy(templateDir, targetDir)

      const packageJsonPath = join(targetDir, 'package.json')
      const packageJson = fse.readJsonSync(packageJsonPath)

      packageJson.name = projectDirectory
      packageJson.version = '1.0.0'

      fse.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 })

      console.log(colors.green('Projeto criado com sucesso!'))
    } catch (err) {
      console.error(colors.red('Erro ao criar o projeto:'), err)
    }
  })

program.parse(process.argv)
