
import React from "react"
import ReactDOM from 'react-dom';
import $ from 'jquery';
import CourseContent from './components/CourseContent.jsx'
import courseData from './../../db/test.js'
import _ from "lodash"



class App extends React.Component {
  constructor(props) {
    super(props);
    // let courseData = [{"title":"Assimilated asynchronous customer loyalty","sectionNumber":1,"entries":[{"name":"Talk by Nikki Batz","entryNumber":1},{"name":"Talk by Frieda Rolfson","entryNumber":2},{"name":"Talk by Ford Konopelski","entryNumber":3},{"name":"Talk by Jaclyn Bode","entryNumber":4},{"name":"Talk by Weldon Lockman","entryNumber":5},{"name":"Talk by Coleman Koepp","entryNumber":6}]},{"title":"Monitored actuating installation","sectionNumber":2,"entries":[{"name":"Talk by Kaylie Kuhic","entryNumber":1},{"name":"Talk by Abelardo Jacobson III","entryNumber":2},{"name":"Talk by Milford Rempel","entryNumber":3},{"name":"Talk by Mr. Violet Kshlerin","entryNumber":4},{"name":"Talk by Dr. Hailie Jaskolski","entryNumber":5},{"name":"Talk by Andre Hagenes","entryNumber":6},{"name":"Talk by Nicklaus Cremin","entryNumber":7}]}]
    // console.log(courseData)

    this.state = {
      courseData: courseData,
      courseItemSetStates: [],
      expanded: false,
      lectureCount: 0

    }
    this.updateCourseItemStates = this.updateCourseItemStates.bind(this)
    this.expandClickHandler = this.expandClickHandler.bind(this)


  // this.state.lectureCount = currLectureCount
  this.setTime()
  this.setMinutes()
  console.log("Fire", this.state.totalLectureCount, this.state.lectureCount)
  }

  setTime() {

    this.state.lectureCount = _.reduce(this.state.courseData,
      (accum, curr) => {
        // console.log(curr.entries.length, accum)
        return accum + curr.entries.length

    },0)

    this.state.totalLectureDuration =
    _.reduce(this.state.courseData, (accum, curr) =>
      (accum +
        _.reduce(curr.entries, (a,c) => (a + c.duration),0))
      ,0)
  }

 setMinutes() {
    let minutes = this.state.totalLectureDuration
    let hours = Math.floor(minutes/60)
    minutes = minutes - hours*60
    console.log(minutes)
    this.state.minutes = minutes < 10 ? "0"+minutes : "" + minutes;
    this.state.hours=  hours < 10 ? "0"+hours : "" + hours;


  }



componentDidMount(){
  let currLectureCount = _.reduce(this.state.courseData,
      (accum, curr) => {
        // console.log(curr.entries.length, accum)
        return accum + curr.entries.length

    },0)

  this.setState({lectureCount: currLectureCount})
}

  updateCourseItemStates(setState) {
    this.state.courseItemSetStates.push(setState)
  }
  expandClickHandler() {
    let setStates = this.state.courseItemSetStates
    
    for(let stateSetter of setStates){
      stateSetter((prevState, props)=>{
       return {"hidden": !this.state.expanded} })
  }
    this.setState((prevState, props)=>{
    return {"expanded": !prevState.expanded} })

}

  componentDidMount(){
    console.log
  }

  // fetchBlogPosts() {
  //   $.get('/api/blogs', (data) => {
  //     this.setState({'data': data});
  //     console.log(data)
  //   })

  // }
  render(){
    return (
      <div className = "app-container">
        <div className = "app-header">
          <span className = "header-title"> Course Content </span>
          <span className = "expand" onClick = {this.expandClickHandler}> {this.state.expanded? "Collapse All" : "Expand All"} </span>
          <span className = "total-lecture-length">
          {this.state.lectureCount} lectures </span>
          <span className = "total-lecture-duration">
          {this.state.hours + ":" + this.state.minutes}</span>
        </div>
        <div className= "course-content-container">
            <CourseContent updateCourseItemStates = {this.updateCourseItemStates} courseData = {this.state.courseData}/>
        </div>
      </div>
    )
  }
}

export default App
