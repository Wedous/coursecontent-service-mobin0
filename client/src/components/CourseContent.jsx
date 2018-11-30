

import React from "react"
import ReactDOM from 'react-dom';
import $ from 'jquery';
import CourseItem from './CourseItem.jsx'


class CourseContent extends React.Component {
  constructor ({courseData, updateCourseItemStates}) {
    super()
    this.state = {
      data: courseData,
      updateCourseItemStates: updateCourseItemStates,
      loading: true
    };
    //console.log('courseCountent this.state.data', this.state.data);
  }

  render () {
    const all = this.state.data;
    return (
      <div className = "course-content">
      {this.state.loading && this.state.data.map((courseItem) =>
      <CourseItem updateCourseItemStates = {this.state.updateCourseItemStates}
      key = {JSON.stringify(courseItem)}
      courseItem = {courseItem}
      total = {all}/>)}
      </div>
  )
}
}

export default CourseContent;