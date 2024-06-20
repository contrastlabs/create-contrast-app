#!/usr/bin/env node

import { join, resolve } from 'node:path'
import { createColors } from 'colorette'
import { Command } from 'commander'
import fse from 'fs-extra'
import inquirer from 'inquirer'

const colors = createColors()

const program = new Command()

program
  .version('1.0.0')
  .arguments('<project-directory>')
  .description('CLI para criar projetos a partir de templates')
  .action(async (projectDirectory) => {
    const templatesDir = join(import.meta.dirname, '../templates')

    const templates = fse
      .readdirSync(templatesDir)
      .filter((file) => fse.statSync(join(templatesDir, file)).isDirectory())

    if (templates.length === 0) {
      console.error(colors.red('Nenhum template disponível.'))

      process.exit(1)
    }

    const { template } = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'Escolha um template para usar:',
        choices: templates,
      },
    ])

    const templateDir = join(templatesDir, template)
    const targetDir = resolve(process.cwd(), projectDirectory)

    try {
      await fse.copy(templateDir, targetDir)

      console.log(colors.green('Projeto criado com sucesso!'))
    } catch (err) {
      console.error(colors.red('Erro ao criar o projeto:', err))
    }
  })

program.parse(process.argv)
