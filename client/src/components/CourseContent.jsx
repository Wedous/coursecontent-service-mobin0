

import React from "react"
import ReactDOM from 'react-dom';
import $ from 'jquery';
import CourseItem from './CourseItem.jsx'


class CourseContent extends React.Component {
  constructor ({courseData,updateCourseItemStates}) {
    super()
    this.state = {
      data: courseData,
      updateCourseItemStates: updateCourseItemStates,
      loading: true
    }
    //console.log('this.state.data', this.state.data);
  }

  render () {
    return (
      <div className = "course-content">
      {this.state.loading && this.state.data.map((courseItem) => <CourseItem updateCourseItemStates = {this.state.updateCourseItemStates} key = {JSON.stringify(courseItem)} courseItem = {courseItem} />)}
      </div>
  )
}
}

export default CourseContent