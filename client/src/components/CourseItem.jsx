

import React from "react"
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Entries from './Entries.jsx'
import _ from "lodash"


class CourseItem extends React.Component {
  constructor ({courseItem, updateCourseItemStates}) {
    super()
    this.state = {
      courseItem: courseItem,
      entries: courseItem.entries,
      title: courseItem.title,
      sectionNumber: courseItem.sectionNumber,
      sectionId: "section" + courseItem.sectionNumber,
      hidden: true,
      updateState: updateCourseItemStates,
      hours: "00",
      minute: "00",
      courseDuration: 0
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.setTime()
    this.setMinutes()

  }

  componentDidMount () {
        this.state.updateState(this.setState.bind(this))
        // this.state.updateState("Hey")
  }

  setTime () {
    this.state.courseDuration = _.reduce(this.state.entries, (a,c) => (a + c.duration),0)

  }
  clickHandler() {
    this.setState({'hidden': !this.state.hidden})
  }

 setMinutes() {
    let minutes = this.state.courseDuration
    let hours = Math.floor(minutes/60)
    minutes = minutes - hours*60
    // console.log(minutes)
    this.state.minutes = minutes < 10 ? "0"+minutes : "" + minutes;
    this.state.hours= hours < 10? "0" + hours : "" + hours;
  }

  render () {
    return (
      <div className = "course-item-container">
          <div className = "course-item" onClick = {this.clickHandler}>
            <span className = "plus-sign">{this.state.hidden ? "+": "–"}</span>
            <span className= "course-title">{this.state.title + ""}</span>
            <span className = {this.state.hidden? "course-lecture-length": "course-lecture-length-hidden"}>{this.state.entries.length + " lectures"}</span>
            <span className = "course-lecture-duration">{this.state.hours + ":" + this.state.minutes}</span>
      </div>
      <div  className = {this.state.hidden ? "course-entries" : "course-entries-shown"} id = {"section" + this.state.sectionNumber}>
      {this.state.entries.map((entry) => (<Entries key = {JSON.stringify(entry)} entry = {entry} sectionNumber = {this.state.sectionNumber}/>)
    )}
      </div>


      </div>
      )



  }



}

export default CourseItem


