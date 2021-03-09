# Create react app boilerplate with Typescript, Styled components, Storybook and Cypress

npm init react-app . --template typescript

```bash
yarn add typescript @types/node @types/react @types/react-dom @types/jest
```

```bash
yarn add styled-components @types/styled-components
```

```bash
yarn add styled-components @types/styled-components
```

```bash
yarn add cypress --dev
```

Add Commands to pacjage.json :

```json
        "cypress:open": "cypress open",
        "cypress:docker": "docker run --network=\"host\"  -it -v $PWD:/e2e -w /e2e cypress/included:6.2.1",
```

remove ./cypress/inregration/examples/

```
npx sb init
```

remove ./src/stories directory

create a tsconfig.json :

```json
// tsconfig.json

{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

create Test.tsx && Test.stories.tsx

```javascript
//Test.tsx
import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

interface TestProps {
  text: string;
}

const Test = ({ text }: TestProps) => {
  return (
    <Wrapper>
      <Title>Hello World!</Title>
      <div>{text}</div>
    </Wrapper>
  );
};

export default Test;
```

```javascript
//Test.stories.tsx

import React from "react";

import Test from "./Test";

<Test text={" This test storybook, React, Styled Components & Typescript"} />;

export default {
  title: "Test",
  component: TestStory,
};
```

Run storybook :

```bash
yarn run storybook
```

Storybook shoud work

```bash
yarn run start
```

Default create react app should be launched

Create Test.spec.js in ./cypress/integration/

```javascript
// ./cypress/integration/Test.spec.js

/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should have the .App container", () => {
    cy.get(".App").should("exist");
  });

  it("Should have the link", () => {
    cy.get("a.App-link").should("exist");
  });

  it("Should have the correct url in the link", () => {
    cy.get("a.App-link")
      .should("have.attr", "href")
      .should("equal", "https://reactjs.org");
  });
});
```

```bash
yarn run cypress:open
```

Test should be available and by clicking on it, it should run correctly

And that's it, we have a boilerplate containing :

- Create react app
- Typescript
- Styled components
- Storybook
- Cypress
