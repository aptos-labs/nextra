import { Sandpack as SP, type SandpackProps } from "@codesandbox/sandpack-react";

interface SandpackWrapperProps extends SandpackProps {}

export function SandpackWrapper({
  files,
  options,
  customSetup,
  ...props
}: SandpackWrapperProps): JSX.Element {
  return (
    <SP
      theme={props.theme === 'dark' ? 'dark' : 'light'}
      options={{ layout: 'console', autorun: true, ...(options as any) }}
      customSetup={{
        entry: 'index.ts',
        dependencies: {
          '@aptos-labs/wallet-adapter-core': '^2.5.1',
          zustand: '^4.4.1',
          aptos: '^1.18.0',
          axios: '^1.4.0',
          '@noble/hashes': '^1.3.1',
          'graphql-request': '^5.0.0',
          graphql: '^16.6.0',
          'graphql-tag': '^2.12.6',
          'numbro': '^2.3.6',
        },
        ...customSetup,
      }}
      files={{
        ...files,
      }}
      {...props}
    />
  );
}

export default SandpackWrapper;
