const Language = {
  TypeScript: 'TypeScript',
  GoLang: 'GoLang',
  Kotlin: 'Kotlin',
}

const DevelopmentArea = {
  Backend: 'Backend',
  Frontend: 'Frontend',
  Mobile: 'Mobile',
}

export const templates = [
  {
    name: 'Express.js',
    path: 'typescript/backend/express-js',
    description: 'HTTP server using Express.js and TypeScript.',
    language: Language.TypeScript,
    developmentArea: DevelopmentArea.Backend,
  },
  {
    name: 'Apollo GraphQL',
    path: 'typescript/backend/apollo-graphql',
    description: 'GraphQL server using Apollo Server and TypeScript.',
    language: Language.TypeScript,
    developmentArea: DevelopmentArea.Backend,
  },
  {
    name: 'Socket.io',
    path: 'typescript/backend/apollo-graphql',
    description: 'Real-time server using Socket.IO and TypeScript.',
    language: Language.TypeScript,
    developmentArea: DevelopmentArea.Backend,
  },
  {
    name: 'gRPC',
    path: 'typescript/backend/grpc',
    description: 'gRPC server using TypeScript.',
    language: Language.TypeScript,
    developmentArea: DevelopmentArea.Backend,
    isDisabled: true,
  },
  {
    name: 'Micro Services',
    path: 'typescript/backend/microservices',
    description: 'Micro Services using Turbo Monorepo and TypeScript.',
    language: Language.TypeScript,
    developmentArea: DevelopmentArea.Backend,
    isDisabled: true,
  },
  {
    name: 'React.js',
    path: 'typescript/frontend/react',
    description: 'Web application using React.js and TypeScript.',
    language: Language.TypeScript,
    developmentArea: DevelopmentArea.Frontend,
    isDisabled: true,
  },
  {
    name: 'Next.js',
    path: 'typescript/frontend/next',
    description: 'Web application using next.js and TypeScript.',
    language: Language.TypeScript,
    developmentArea: DevelopmentArea.Frontend,
    isDisabled: true,
  },
  {
    name: 'Micro Frontends',
    path: 'typescript/frontend/microfrontends',
    description: 'Micro Frontends using Turbo Monorepo and TypeScript.',
    language: Language.TypeScript,
    developmentArea: DevelopmentArea.Frontend,
    isDisabled: true,
  },
  {
    name: 'Jetpack Compose',
    path: 'kotlin/mobile/jetpack-compose',
    description: 'Mobile application using Jetpack Compose and Kotlin.',
    language: Language.Kotlin,
    developmentArea: DevelopmentArea.Mobile,
    isDisabled: true,
  },
  {
    name: 'Gin',
    path: 'golang/backend/gin',
    description: 'HTTP server using Gin and Go.',
    language: Language.GoLang,
    developmentArea: DevelopmentArea.Backend,
    isDisabled: true,
  },
]

export const developmentAreas = [
  DevelopmentArea.Backend,
  DevelopmentArea.Frontend,
  DevelopmentArea.Mobile,
]

export const languages = [Language.TypeScript, Language.Kotlin, Language.GoLang]
