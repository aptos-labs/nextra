#!/usr/bin/env node
 
import { cyan, red, yellow, bold } from 'picocolors'
import Conf from 'conf'
import path from 'path'
import prompts from 'prompts'
import type { InitialReturnValue } from 'prompts'
import checkForUpdate from 'update-check'
import { createApp, DownloadError } from './create-app'
import { validateNpmName } from './helpers/validate-pkg'
import packageJson from './package.json'
import { isFolderEmpty } from './helpers/is-folder-empty'
import fs from 'fs'

let projectPath: string = ''

const handleSigTerm = () => process.exit(0)

process.on('SIGINT', handleSigTerm)
process.on('SIGTERM', handleSigTerm)

const onPromptState = (state: {
  value: InitialReturnValue
  aborted: boolean
  exited: boolean
}) => {
  if (state.aborted) {
    // If we don't re-enable the terminal cursor before exiting
    // the program, the cursor will remain hidden
    process.stdout.write('\x1B[?25h')
    process.stdout.write('\n')
    process.exit(1)
  }
}

const packageManager = 'pnpm'

async function run(): Promise<void> {
  const conf = new Conf({ projectName: 'create-aptos-docs' })

  const res = await prompts({
    onState: onPromptState,
    type: 'text',
    name: 'path',
    message: 'What is your project named?',
    initial: '@aptos-labs/sdk-docs',
    validate: (name) => {
      const validation = validateNpmName(path.basename(path.resolve(name)))
      if (validation.valid) {
        return true
      }
      return 'Invalid project name: ' + validation.problems[0]
    },
  })

  projectPath = res.path;
  const resolvedProjectPath = path.resolve(projectPath)
  const projectName = path.basename(resolvedProjectPath)

  const validation = validateNpmName(projectName)
  if (!validation.valid) {
    console.error(
      `Could not create a project called ${red(
        `"${projectName}"`
      )} because of npm naming restrictions:`
    )

    for (const p of validation.problems) console.error(`    ${red(bold('*'))} ${p}`)
    
    process.exit(1)
  }

  /**
   * Verify the project dir is empty or doesn't exist
   */
  const root = path.resolve(resolvedProjectPath)
  const appName = path.basename(root)
  const folderExists = fs.existsSync(root)

  if (folderExists && !isFolderEmpty(root, appName)) {
    process.exit(1)
  }

  const preferences = (conf.get('preferences') || {}) as Record<
    string,
    boolean | string
  >

  try {
    await createApp({
      appPath: resolvedProjectPath,
      packageManager,
      typescript: true,
      eslint: true,
      tailwind: false,
      appRouter: false,
      srcDir: true,
      importAlias: '',
    })
  } catch (reason) {
    if (!(reason instanceof DownloadError)) {
      throw reason
    }
  }
  conf.set('preferences', preferences)
}

const update = checkForUpdate(packageJson).catch(() => null)

async function notifyUpdate(): Promise<void> {
  try {
    const res = await update
    if (res?.latest) {
      const updateMessage = 'pnpm add -g create-next-app'

      console.log(
        yellow(bold('A new version of `create-next-app` is available!')) +
          '\n' +
          'You can update by running: ' +
          cyan(updateMessage) +
          '\n'
      )
    }
    process.exit()
  } catch {
    // ignore error
  }
}

run()
  .then(notifyUpdate)
  .catch(async (reason) => {
    console.log()
    console.log('Aborting installation.')
    if (reason.command) {
      console.log(`  ${cyan(reason.command)} has failed.`)
    } else {
      console.log(
        red('Unexpected error. Please report it as a bug:') + '\n',
        reason
      )
    }
    console.log()

    await notifyUpdate()

    process.exit(1)
  })
