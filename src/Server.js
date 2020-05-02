import { Component } from 'inferno'

export default class Server extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: props.data.environment === "archived" ? "Discontinued" : "Checking...",
      statusID: props.data.environment === "archived" ? 2 : -1
    }

    this.checkStatus(props)
  }

  checkStatus(props) {
    if(props.data.environment === "archived") return

    fetch('https://tmtdqnjazd.execute-api.us-east-1.amazonaws.com/dev/server-status?id=' + props.data.id)
    .then((response) => response.json())
    .then((responseJson) => {
      switch(responseJson.isUp) {
        case true:
          this.setState({
            status: "Online",
            statusID: 1
          })
          break
        case false:
        default:
          this.setState({
            status: "Offline",
            statusID: 0
          })
      }
    })
    .catch((error) => {
      console.error(error)
    })
  }

  render() {
    return (
      <div className={this.props.index % 2 !== 0 ? "server odd" : "server"}>
        <div>
          <h2>{this.props.data.name}</h2>
          <p>{this.props.data.region}, {this.props.data.country}</p>
          {this.props.data.environment !== "archived" &&
            <small>{this.props.data.environment}</small>
          }
        </div>
        
        <div style={{"text-align": "right"}}>
          <h2>Status</h2>
          <p style={{"color": this.statusColour()}}>{this.state.status}</p>
        </div>
      </div>
    )
  }

  statusColour() {
    switch(this.state.statusID) {
      case 0:
        return "rgb(200, 80, 80)"
      case 1:
        return "rgb(80, 200, 80)"
      default:
        return "grey"
    }
  }
}
