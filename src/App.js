import { Component } from 'inferno'
import './registerServiceWorker'
import Logo from './moon.png'
import Server from './Server'
import './App.css'
import sortBy from 'lodash.sortby'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      servers: []
    }
  }

  componentWillMount() {
    fetch('https://tmtdqnjazd.execute-api.us-east-1.amazonaws.com/dev/server-locs')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({servers: responseJson})
    })
    .catch((error) => {
      console.error(error)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="https://sleepystudios.net"><img src={Logo} alt="Sleepy logo icon" /></a>
          <h1>Sleepy Studios Eyes</h1>
        </header>

        <h4>What's up?</h4>

        <div id="servers">
          {sortBy(this.state.servers, "name").map((s, i) => (
            <Server
              key={i}  
              data={s}
              index={i}
            />
          ))}
        </div>
        
        {this.state.servers.length > 0 &&
          <div id="waker-bit">
            <img id="waker-avi" src="https://pbs.twimg.com/profile_images/884105207361265664/BjMN2TfO_400x400.jpg" alt="Waker avatar" /> 
            <p>Don't forget to check the <a href="https://twitter.com/waker_bot" target="_blank">Waker</a> and <a href="https://twitter.com/sleepystudios" target="_blank">Sleepy Studios</a> twitter accounts for news</p>                
          </div>
        }
      </div>
    )
  }
}

export default App
