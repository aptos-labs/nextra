import { HoverCard, Portal } from '@ark-ui/react'
import { css } from 'styled-system/css'
import { center, flex, hstack, vstack, wrap } from 'styled-system/patterns'

interface NavigationProps {
  children: React.ReactElement | React.ReactElement[]
}

export interface NavigationMenuItemType {
  title: string
  subtitle: string
  link: string
  iconUrl?: string
  iconSvg?: React.ReactElement
}

export interface NavigationMenuSectionType {
  title: string
  items: NavigationMenuItemType[]
}

export interface NavigationMenuType {
  sections: NavigationMenuSectionType[]
}

export enum NavigationHeaderCategories {
  DEVELOPERS = 'developers',
  PRODUCTS = 'products',
  NETWORK = 'network'
}

export type NavigationHeaderType = Record<
  NavigationHeaderCategories,
  NavigationMenuType
>

export const NavigationMenuItem = ({
  title,
  subtitle,
  link,
  iconSvg,
  iconUrl
}: NavigationMenuItemType) => {
  return (
    <a
      href={link}
      className={hstack({
        gap: 4,
        px: 4,
        py: 3,
        borderRadius: 'md',
        transition: 'ease-in-out',
        transitionDuration: 'faster',
        _hover: { bgColor: 'ButtonShadow' }
      })}
    >
      <div
        className={center({
          h: '48px',
          justifyContent: 'left',
          aspectRatio: '1 / 1'
        })}
      >
        {iconSvg ? (
          iconSvg
        ) : (
          <img
            className={css({
              h: '40px',
              aspectRatio: '1 / 1',
              objectFit: 'cover'
            })}
            src={iconUrl}
            alt={subtitle}
          />
        )}
      </div>
      <div className={vstack({ alignItems: 'flex-start', gap: 0 })}>
        <span className={css({ fontSize: 'md', fontWeight: 'medium' })}>
          {title}
        </span>
        <span
          className={css({
            fontSize: 'md',
            fontWeight: 'normal',
            color: 'GrayText'
          })}
        >
          {subtitle}
        </span>
      </div>
    </a>
  )
}

export type NavigationSectionProps = {
  title: string
  index: number
} & NavigationProps

export const NavigationSection = ({
  children,
  index,
  title
}: NavigationSectionProps) => {
  return (
    <div
      className={vstack({
        direction: 'column'
      })}
    >
      <div
        className={flex({
          width: '100%',
          px: 4,
          py: 2,
          bgColor: 'ButtonShadow',
          borderTopRadius: index === 0 ? 'md' : 'unset'
        })}
      >
        <span
          className={css({
            fontSize: 'md',
            fontWeight: 'medium',
            textAlign: 'left',
            px: 3
          })}
        >
          {title}
        </span>
      </div>
      <div
        className={wrap({
          px: 3
        })}
      >
        {children}
      </div>
    </div>
  )
}

export const NavigationMenuContent = ({ children }: NavigationProps) => {
  return (
    <div
      className={vstack({
        borderRadius: 'md',
        borderColor: 'ActiveBorder',
        bgColor: 'Window',
        boxShadow: 'lg',
        border: '1px solid black',
        pb: 3,
        _dark: {
          bgColor: 'black'
        },
        '&:first-child > .special-class': {
          bgColor: 'blue'
        }
      })}
    >
      {children}
    </div>
  )
}

export type NavigationMenuProps = NavigationProps & {
  trigger: React.ReactElement
}

export const NavigationMenu = ({ children, trigger }: NavigationMenuProps) => {
  return (
    <HoverCard.Root openDelay={0} open={true}>
      <HoverCard.Trigger>{trigger}</HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content>
            <HoverCard.Arrow>
              <HoverCard.ArrowTip />
            </HoverCard.Arrow>
            <NavigationMenuContent>{children}</NavigationMenuContent>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  )
}

export default {
  Root: NavigationMenu,
  Section: NavigationSection,
  MenuItem: NavigationMenuItem
}
