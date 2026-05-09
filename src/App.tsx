import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import { Logo } from './shared/ui/Logo/Logo';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <header>
      <Logo/>
    </header>
    <main></main>
      <section id="center">
        
          
          <p>
            здесь будут ваши записи
          </p>
        
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>

      <footer></footer>
    </>
  )
}

export default App
