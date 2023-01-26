import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{props.text}:</td>
            <td>{props.value}</td>
          </tr>
        </tbody> 
      </table>
    </div>
  )
}
const Statistics = (props) => {
  if ((props.good+props.bad+props.neutral) === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
  <div>
    <StatisticLine text="Good" value = {props.good} />
    <StatisticLine text="Neutral" value = {props.neutral} />
    <StatisticLine text="Bad" value = {props.bad} />
    <table>
      <tbody>
        
        <tr>
          <td>Total:</td>
          <td>{props.good + props.bad + props.neutral}</td>
        </tr>
        <tr>
          <td>Average:</td>
          <td>{(props.good-props.bad)/(props.good+props.bad+props.neutral)}</td>
        </tr>
        <tr>
          <td>Positive:</td>
          <td>{props.good*100/(props.good+props.bad+props.neutral)}%</td>
        </tr>
      </tbody>
    </table>
    
  </div>
  )
}
const Button = (props) => {
  const handleAction = () => {
    props.action(props.name+1)
  }
 return (
  <div>
    <button onClick={handleAction}>{(props.text)}</button>
  </div>
 )

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setneutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <table>
        <tbody>
          <tr>
            <td>
              <Button name= {good} action={setGood} text="good"/>
            </td>
            <td>
              <Button name= {neutral} action={setneutral} text="neutral"/>
            </td>
            <td>
              <Button name= {bad} action={setBad} text="bad"/>
            </td>
          </tr>
        </tbody>
      </table>
      
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
