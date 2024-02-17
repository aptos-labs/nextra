export default {
  index: {
    title: 'Introduction',
    type: 'page',
    display: 'hidden'
  },
  docs: {
    type: 'page',
    title: 'Docs'
  },
  about: {
    type: 'menu',
    title: 'About',
    items: {
      contributors: {
        title: 'Contributors',
        href: 'https://github.com/aptos-labs/nextra/contributors',
        newWindow: true
      },
      team: {
        title: 'Team'
      },
    }
  },
  nextra_link: {
    type: 'page',
    title: 'Nextra ↗',
    href: 'https://nextra.site',
    newWindow: true
  }
}
