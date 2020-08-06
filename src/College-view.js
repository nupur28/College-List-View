import React from 'react';
import './App.css';
import * as Constants from './constants';

class CollegeView extends React.Component{

  constructor(props){
		super(props);
		this.state = {
			collegeList: [],
		}
  }
  
  componentDidMount() {
    //fetch initial data to display
    const collegesArray = Constants.collegeJson.colleges;
    const collegesToLoad = [];
    for (let i = 0; i < 10; i++) {
      collegesToLoad.push(collegesArray[i]);
    }
    this.setState(
      {collegeList: collegesToLoad}
    )
    window.addEventListener('scroll', this.onScroll);
  }

  // function to append more colleges when user scrolls to the bottom
  onScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight-1) {
        //fetch new data and append to existing list
        const collegesArray = Constants.collegeJson.colleges;
        const collegesToLoad = [];
        if (this.state.collegeList.length !== 50) {
          for (let i = this.state.collegeList.length; i < this.state.collegeList.length + 10; i++) {
            collegesToLoad.push(collegesArray[i]);
          }
          this.setState(
            {collegeList: this.state.collegeList.concat(collegesToLoad)}
          )
        }
    } 
    else {
        //don’t do anything 
      }
   }

  // diisplay the dynamic properties of college list
  render() {
    const colleges = this.state.collegeList.map((college, index) => {
      const rating = college.rating;
      return (
        <div className="grid-item grid-item-main">
            <div className = "main-box">
              <div className = "img-div">
                { index%2 === 0 ? <img className = "clg-img" src = {require('./assets/images/college_02.jpg')} alt = "college" /> : <img className = "clg-img" src = {require('./assets/images/college_01.jpg')} alt = "college" /> }
                { college.promoted ? <span className = "ribbon">PROMOTED</span> : null}
                <div className = "rating-box">
                  <p><span>{ college.rating }</span>/5</p>
                  <p>{ college.rating_remarks }</p>
                </div>
                <div className = "tags">
                  {
                    college.tags.map((tag) => {
                      return (
                        <span>{ tag }</span>
                      )
                    })
                  }
                </div>
                <div className = "hashTag">
                  <span>{ college.ranking }</span>
                </div>
              </div>
              <div className = "college-details">
                <div className = "grid-container sub-grid">
                  <div className = "grid-item">
                    <div className = "clg-name">{ college.college_name }&nbsp;&nbsp;
                    <span className = "five-stars">
                      {
                        Array.from({ length: rating }, () => (
                          <span className="fa fa-star checked"></span>
                        ))
                      }
                      {
                        Array.from({ length: 5 - rating }, () => (
                          <span className="fa fa-star"></span>
                        ))
                      }
                    </span>
                    </div>
                    <div className = "address">{ college.nearest_place[0] } <span> | { college.nearest_place[1] }</span></div>
                    <div className = "nearby"><span className = "blue"> 93% match :</span> { college.famous_nearest_places }</div>
                    <div className = "discount"><b>{ college.offertext }</b></div>
                  </div>
                  <div className = "grid-item fees-section">
                    <div className = "total-fees"><span className = "oprice">&#8377; { college.original_fees }</span> <span className = "pricetag">{ college.discount }</span></div>
                    <div className = "discounted-fees">&#8377; { college.discounted_fees }</div>
                    <div className = "duration">{ college.fees_cycle }</div>
                    <div className = "wi-fi">
                      {
                        college.amenties.map((amenty) => {
                          return (
                            <span className = "blue">{ amenty } . </span>
                          )
                        })
                      } 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )
    }
        
    );

    return (
      <div className="App">
        <h3 className = "Colleges-in-North-India">Colleges in North India</h3>
        <div className="grid-container main-grid">
          {colleges}
        </div>
      </div>
    );
  }
}

export default CollegeView;
