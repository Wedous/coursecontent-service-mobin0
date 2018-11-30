
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import CourseContent from './components/CourseContent.jsx';
import _ from 'lodash';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseData: [],
      courseItemSetStates: [],
      expanded: false,
      lectureCount: 0,
      loading: false
    };
    this.updateCourseItemStates = this.updateCourseItemStates.bind(this);
    this.expandClickHandler = this.expandClickHandler.bind(this);
    this.setTime();
    this.setMinutes();
    //console.log('Fire', this.state.totalLectureCount, this.state.lectureCount);
  }

  setTime() {
    this.state.lectureCount = _.reduce(this.state.courseData,
      (accum, curr) => {
        return accum + curr.entry.length;
      }, 0);

    this.state.totalLectureDuration =
    _.reduce(this.state.courseData, (accum, curr) =>
      (
        accum +
        _.reduce(curr.entry, (a, c) => (a + c.duration), 0))
    , 0);
  }

  setMinutes() {
    let minutes = this.state.totalLectureDuration;
    let hours = Math.floor(minutes / 60);
    minutes = minutes - hours * 60;
    //console.log(minutes);
    this.state.minutes = minutes < 10 ? '0' + minutes : '' + minutes;
    this.state.hours = hours < 10 ? '0' + hours : '' + hours;
  }

  componentDidMount() {
    const course = Math.floor(Math.random() * 10000000);
    //console.log('house: ')
    axios.get(`/api/${course}`).then((response) => {
      this.setState({
        courseData: response.data,
        loading: true
      });
      //console.log('App.jsx this.state.courseData', this.state.courseData);
    }).catch((err) => {
      console.log('error: ', err);
    });
    let currLectureCount = _.reduce(this.state.courseData,
      (accum, curr) => {
        console.log('???');
        return accum + curr.entry.length;
      }, 0);
    //console.log('currLectureCount', currLectureCount);
    this.setState({lectureCount: currLectureCount});
  }

  updateCourseItemStates(setState) {
    this.state.courseItemSetStates.push(setState);
  }
  expandClickHandler() {
    let setStates = this.state.courseItemSetStates;
    for(let stateSetter of setStates){
      stateSetter((prevState, props)=>{
       return {"hidden": !this.state.expanded} })
  }
    this.setState((prevState, props)=>{
    return {"expanded": !prevState.expanded} })
}

  render(){
    return (
      <div className = "app-container">{this.state.loading &&
        <div>
        <div className = "app-header">
          <span className = "header-title"> Course Content </span>
          <span className = "expand" onClick = {this.expandClickHandler}> {this.state.expanded? "Collapse All" : "Expand All"} </span>
          <span className = "total-lecture-length">
          {this.state.courseData.length} lectures </span>
          <span className = "total-lecture-duration">
          {this.state.hours + ":" + this.state.minutes}</span>
        </div>
        <div className= "course-content-container">
            <CourseContent updateCourseItemStates = {this.updateCourseItemStates} courseData = {this.state.courseData}/>
        </div>
        </div>
      }</div>
    )
  }
}

export default App;
