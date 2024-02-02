import type { Meta, StoryObj } from '@storybook/react'
import { metadata } from './common'
import NavigationMenu, { NavigationMenuContent } from './NavigationMenu'

const DocsNavMenuContent = () => {
  return (
    <NavigationMenuContent>
      {metadata.sections.map(({ title, items }, index) => {
        return (
          <NavigationMenu.Section index={index} title={title} key={title}>
            {items.map(item => {
              return <NavigationMenu.MenuItem key={item.title} {...item} />
            })}
          </NavigationMenu.Section>
        )
      })}
    </NavigationMenuContent>
  )
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},

  component: DocsNavMenuContent,

  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],

  title: 'Example/NavigationMenu'
} satisfies Meta<typeof NavigationMenu>

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Root: Story = {
  args: {
    id: '1683920951807971329'
  }
}

export default meta
