

import React from "react"
import ReactDOM from 'react-dom';
import $ from 'jquery';
import CourseItem from './CourseItem.jsx'


class CourseContent extends React.Component {
  constructor ({courseData,updateCourseItemStates}) {
    super()
    this.state = {
      data: courseData,
      updateCourseItemStates: updateCourseItemStates
    }
    // console.log("Course Content Data", this.state.data)
  }

 // setMinutes() {
 //    let minutes = this.state.entry.duration
 //    let hours = Math.floor(minutes/60)
 //    minutes = minutes - hours*60
 //    // console.log(minutes)
 //    this.state.minutes = minutes < 10 ? "0"+minutes : "" + minutes;
 //    this.state.hours= "0" + hours


 //  }
  render () {
    return (
      <div className = "course-content">
      {this.state.data.map((courseItem) => <CourseItem updateCourseItemStates = {this.state.updateCourseItemStates} key = {JSON.stringify(courseItem)} courseItem = {courseItem} />)}
      </div>
)


  }



}

export default CourseContent