// surveyNew shows surveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
   state = { showFormReview: false };

   renderContent() {
      if (this.state.showFormReview === true) {
         return <SurveyFormReview
                  onCancel={() => this.setState({ showFormReview: false })} />
      } else {
         return <SurveyForm 
                  onSurveySubmit={() => this.setState({ showFormReview: true })} />
      }
   }

   render() {
      return (
         <div>
            Campaign Title
            {this.renderContent()}
         </div> 
      )
   }
}

export default reduxForm({
   form: 'surveyForm'
})(SurveyNew);