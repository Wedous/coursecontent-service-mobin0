import React from 'react';
import Item from "./../components/CourseItem.jsx";
import renderer from "react-test-renderer"
import { cleanup, fireEvent, waitForElement } from 'react-testing-library';
import {shallow, mount, render, configure} from 'enzyme';
import 'jest-dom/extend-expect';
import Adapter from 'enzyme-adapter-react-16';
import courseData from './../../../old_db/test.js';


configure({ adapter: new Adapter() });

afterEach(cleanup);

const testCase = courseData[0]

describe('CourseItem', () => {
  let mockUpdateState = jest.fn()
  const CourseItem = shallow(<Item courseItem = {testCase} updateCourseItemStates = {mockUpdateState}/>)

  it ('should have same snapshot', () => {
  expect(CourseItem).toMatchSnapshot()
  })

  it ('should load', () => {
 	expect(CourseItem.exists()).toBeTruthy()
  })

  it ('should have called update function', () => {
 	expect(mockUpdateState).toHaveBeenCalled()
  })

  it ('should have a + sign', () => {
 	expect(CourseItem.find('.plus-sign').text()).toBe("+")
  })

  it ('should have correct course title', () => {
  	expect(CourseItem.find('.course-title').text()).toBe(testCase.title)
  })

  it ('should have the correct hours', () => {
  	expect(CourseItem.state().hours).toBe("04")
  })

  it ('should have the correct minutes', () => {
  	expect(CourseItem.state().minutes).toBe("09")
  })

  it ('should have the course-lecture-length visible', () => {
 	expect(CourseItem.find('.course-lecture-length').length).toBe(1)
  })

  it ('should have the course entries hidden', () => {
 	expect(CourseItem.find('.course-entries').length).toBe(1)
  })

})