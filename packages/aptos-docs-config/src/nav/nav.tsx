// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import type { ReactElement } from 'react';

export interface NavigationMenuItemType {
  title: string
  subtitle: string
  link: string
  iconUrl?: string
  iconSvg?: ReactElement
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

export const defaultNav: NavigationHeaderType = {
  developers: {
    sections: [
      {
        title: 'Developer Tooling',
        items: [
          {
            title: 'Typescript SDK',
            subtitle: 'Build web applications',
            iconUrl:
              'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
            link: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg'
          },
          {
            title: 'Typescript SDK',
            subtitle: 'Build web applications',
            iconUrl:
              'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
            link: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg'
          }
        ]
      },
      {
        title: 'Move',
        items: [
          {
            title: 'Typescript SDK',
            subtitle: 'Build web applications',
            iconUrl:
              'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
            iconSvg: <div>hi</div>,
            link: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg'
          },
          {
            title: 'Typescript SDK',
            subtitle: 'Build web applications',
            iconUrl:
              'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
            link: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg'
          }
        ]
      }
    ]
  },
  network: {
    sections: []
  },
  products: {
    sections: []
  }
}
