

import React from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Entries from './Entries.jsx';
import _ from "lodash";


class CourseItem extends React.Component {
  constructor ({courseItem, total, updateCourseItemStates}) {
    super();
    this.state = {
      courseItem: courseItem,
      total: total,
      //entries: courseItem.entries,
      title: courseItem.title,
      //sectionNumber: courseItem.sectionNumber,
      //sectionId: "section" + courseItem.sectionNumber,
      hidden: true,
      updateState: updateCourseItemStates,
      hours: "00",
      minute: "00",
      courseDuration: 0,
      loading: true
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.setTime();
    this.setMinutes();
    //console.log('courseItem this.state.courseItem', this.state.courseItem);
  }

  componentDidMount () {
    this.state.updateState(this.setState.bind(this));
  }

  setTime () {
    this.state.courseDuration = _.reduce(this.state.total, (a,c) => (a + c.duration),0)

  }
  clickHandler() {
    this.setState({'hidden': !this.state.hidden})
  }

  setMinutes() {
    let minutes = this.state.courseDuration;
    let hours = Math.floor(minutes/60);
    minutes = minutes - hours * 60;
    this.state.minutes = minutes < 10 ? "0"+minutes : "" + minutes;
    this.state.hours= hours < 10? "0" + hours : "" + hours;
  }

  render () {
    return (
      <div className = "course-item-container">
        <div className = "course-item" onClick = {this.clickHandler}>
          <span className = "plus-sign">{this.state.hidden ? "+": "–"}</span>
          <span className= "course-title">{this.state.title + ""}</span>
          <span className = {this.state.hidden? "course-lecture-length": "course-lecture-length-hidden"}>{this.state.total.length + " lectures"}</span>
          <span className = "course-lecture-duration">{this.state.hours + ":" + this.state.minutes}</span>
        </div>
        <div className = {this.state.hidden ? "course-entries" : "course-entries-shown"} id = {"section" + this.state.sectionNumber}>
          { this.state.loading && this.state.total.map((entry) => (<Entries
          key = {JSON.stringify(entry)} entry = {entry}
          sectionNumber = {this.state.sectionNumber}/>)
          )}
        </div>
      </div>
    );
  }
}

export default CourseItem;


