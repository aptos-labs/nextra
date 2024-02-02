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

export const metadata: NavigationMenuType = {
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
}
