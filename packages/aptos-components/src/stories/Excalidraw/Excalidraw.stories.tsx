import type { Meta, StoryObj } from '@storybook/react'
import { ReactNode } from 'react'
import { vstack } from 'styled-system/patterns'
import { Excalidraw } from './Excalidraw'

const component = (): ReactNode => {
  return (
    <div className={vstack({ width: '600px', height: '600px' })}>
      <Excalidraw size="lg" />
    </div>
  )
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},

  component,

  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],

  title: 'Example/Excalidraw'
} satisfies Meta<typeof Excalidraw>

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    id: '1683920951807971329'
  }
}

export default meta
