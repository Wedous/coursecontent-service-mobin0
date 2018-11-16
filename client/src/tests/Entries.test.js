import React from 'react';
import Entries from "./../components/Entries.jsx";
import renderer from "react-test-renderer"
import { cleanup, fireEvent, waitForElement } from 'react-testing-library';
import {shallow, mount, render, configure} from 'enzyme';
import 'jest-dom/extend-expect';
import Adapter from 'enzyme-adapter-react-16';
import courseData from './../../../old_db/test.js'


configure({ adapter: new Adapter() });

afterEach(cleanup);

const testCase = courseData[0].entries[0]

describe('Entries', () => {
  // setupSandbox()
  const entries = shallow(<Entries entry = {testCase}/>)

  it ('should have same snapshot', () => {
  expect(entries).toMatchSnapshot()
  })

  it ('should load', () => {
 	expect(entries.exists()).toBeTruthy()
  })

  it ('should have entry-name div', () => {
 	expect(entries.find('.entry-name').length).toBe(1)
  })

  it ('should have entry-name text', () => {
  	expect(entries.find('.entry-name').text()).toBe(testCase.name)
  })

  it ('should have the correct hours', () => {
  	expect(entries.state().hours).toBe("04")
  })

  it ('should have the correct minutes', () => {
  	expect(entries.state().minutes).toBe("09")
  })

  it ('should have the correct time', () => {
 	expect(entries.find('.entry-lecture-length').text()).toBe('04:09')
  })

})
  // const entryName = sel('entry-name')
  // console.log(entryName.text())
//   it('should work', () => {
//     const w = mount(<Greeting />)
//     helloBtn(w).simulate('click')
//   })

//     it('should work', () => {
//     const w = mount(<Greeting />)
//     helloBtn(w).simulate('click')
//   })


//       it('should work', () => {
//     const w = mount(<Greeting />)
//     helloBtn(w).simulate('click')
//   })


//         it('should work', () => {
//     const w = mount(<Greeting />)
//     helloBtn(w).simulate('click')
//   })

//   it('should provide the greeting', async () => {
//     const w = mount(<Greeting />)

//     await reflush(w)

//     expect(w.text()).toEqual('Hello worldGreet me')

//     findByText(/Greet/, w).simulate('click')
//   })
// })


// let entry = {"name":"Talk by Marlen Daniel","duration":196,"entryNumber":1}
//
 // describe('I am a KING', () => {
//   test('works', () => {
//     renderer.create(<Entries entry = {entry}/>)

//   })
// })



// describe('CourseHeader Component', () => {
//   test('renders to the document', () => {
//     render(<CourseHeader />);
//   });

//   test('displays the course title', () => {
//     const { container } = render(<CourseHeader courseData={mockCourseData}/>);
//     expect(container).toHaveTextContent(mockCourseData.title);
//   });

//   test('displays the course subtitle', () => {
//     const { container } = render(<CourseHeader courseData={mockCourseData}/>);
//     expect(container).toHaveTextContent(mockCourseData.subtitle);
//   });

//   test('renders the rating component', () => {
//     const { container } = render(<CourseHeader courseData={mockCourseData} />);
//     const ratingComponent = container.querySelector('.ui.star.rating');
//     expect(ratingComponent).toBeInTheDocument();
//   })

//   test('Renders the rating component with the corrct star count', () => {
//     const { container } = render(<CourseHeader courseData={mockCourseData} />);
//     const starCount = container.querySelectorAll('.active').length;
//     expect(starCount).toBe(correctText.star_count);
//   })


// // describe('My work', () => {
// //   test('works', () => {
// //     const r = renderer.create()
// //   })
// // })
