import React from 'react';
import Content from "./../components/CourseContent.jsx";
import renderer from "react-test-renderer"
import { cleanup, fireEvent, waitForElement } from 'react-testing-library';
import {shallow, mount, render, configure} from 'enzyme';
import 'jest-dom/extend-expect';

import Adapter from 'enzyme-adapter-react-16';
import courseData from './../../../db/test.js'


configure({ adapter: new Adapter() });

afterEach(cleanup);

const testCase = courseData

describe('CourseContent', () => {
  let mockUpdateState = jest.fn()
  const CourseContent = shallow(<Content courseData = {testCase} updateCourseContentStates = {mockUpdateState}/>)

  it ('should have same snapshot', () => {
  expect(CourseContent).toMatchSnapshot()
  })

  it ('should load', () => {
  expect(CourseContent.exists()).toBeTruthy()
  })

  it ('should have the right number of entries', () => {
  expect(CourseContent.find('.course-item-container').length).toBe(testCase.entries.length)
  })

  it ('should have a course content div', () => {
    expect(CourseContent.find('.course-content').length).toBe(1)
  })

})