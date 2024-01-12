import './style.css'
import { setupCounter } from './counter.ts'
import { intialize } from './auth/index.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Spotify Shuffler</h1>
    <section id="profile">
      <h2>Logged in as <span id="displayName"></span></h2>
      <span id="avatar"></span>
      <ul>
          <li>User ID: <span id="id"></span></li>
          <li>Email: <span id="email"></span></li>
          <li>Spotify URI: <a id="uri" href="#"></a></li>
          <li>Link: <a id="url" href="#"></a></li>
          <li>Profile Image: <span id="imgUrl"></span></li>
      </ul>
    </section>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>

  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
intialize();