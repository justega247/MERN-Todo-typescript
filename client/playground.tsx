// React TypeScript - How To Set Types on Hooks (+cheat sheet)

import * as React from "react";

// Set types on useState

// To set types on useState hook, you need to pass into <> the type of the state.
// You can also use union type like this <number | null> if you don't have an initial state.

export const App = () => {
  const [counter, setCounter] = React.useState<number>(0)

  return (
    <div className="App">
      <h1>Result: { counter }</h1>
      <button onClick={() => setCounter(counter + 1)}>+</button>
      <button onClick={() => setCounter(counter - 1)}>-</button>
    </div>
  )
}


// Set types on useRef

// useRef receives types is the same as the useState hook.
// You just have to pass it into the <> - and, if you have multiple type annotations,
// just use union type as shown below.

export const Ref  = () => {
  const myRef = React.useRef<HTMLElement | null>(null)

  return (
    <main className="App" ref={myRef}>
      <h1>My title</h1>
    </main>
  );
}

// Set types on useContext 

// type WithChildren<T = {}> = 
//   T & { children?: React.ReactNode };

// type CardProps = WithChildren<{
//   title: string
// }>

// function Card({ title, children }: CardProps) {
//   return <>
//     <h1>{ title }</h1>
//     {children}
//   </>
// }

interface IArticle {
  id: number
  title: string
}

const ArticleContext = React.createContext<IArticle[] | []>([]);

const ArticleProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [articles, setArticles] = React.useState<IArticle[] | []>([
    { id: 1, title: "post 1" },
    { id: 2, title: "post 2" }
  ]);

  return (
    <ArticleContext.Provider value={{ articles }}>
      {children}
    </ArticleContext.Provider>
  );
}

const ShowArticles = () => {
  const { articles } = React.useContext<IArticle[]>(ArticleContext);

  return (
    <div>
      {articles.map((article: IArticle) => (
        <p key={article.id}>{article.title}</p>
      ))}
    </div>
  );
};

export const Pop = () => {
  return (
    <ArticleProvider>
      <h1>My title</h1>
      <ShowArticles />
    </ArticleProvider>
  );
}


// set types on useReducer

enum ActionType {
  INCREMENT_COUNTER = "INCREMENT_COUNTER",
  DECREMENT_COUNTER = "DECREMENT_COUNTER"
}

interface IReducer {
  type: ActionType;
  count: number;
}

interface ICounter {
  result: number;
}

const initialState: ICounter = {
  result: 0
}

const countValue: number = 1;

const reducer: React.Reducer<ICounter, IReducer> = (state, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_COUNTER:
      return { result: state.result + action.count };
    case ActionType.DECREMENT_COUNTER:
      return { result: state.result - action.count };
    default:
      return state;
  }
}

export default function Red() {
  const [state, dispatch] = React.useReducer<React.Reducer<ICounter, IReducer>>(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>Result: {state.result}</h1>
      <button
        onClick={() =>
          dispatch({ type: ActionType.INCREMENT_COUNTER, count: countValue })
        }> +
      </button>
      <button
        onClick={() =>
          dispatch({ type: ActionType.DECREMENT_COUNTER, count: countValue })
        }> -
      </button>
    </div>
  );
}

// set types on useMemo

const computeExpensiveValue = (a) => `Hello ${a}`;

const memoizedValue = React.useMemo<string>(() => {
  computeExpensiveValue(a)
}, [a])


// set types on useCallback

type CallbackType = (...args: string[]) => void

const memoizedCallback = React.useCallback<CallbackType>(() => {
    doSomething(a, b);
  }, [a, b]);