
import './App.css';
import Students from './components/Students';
import React from 'react';
import Student from "./components/Student";
import StudentTab from "./components/StudentTab";
import { ReactSEOMetaTags } from 'react-seo-meta-tags';

<ReactSEOMetaTags
      website={{  }}
      breadcrumb={[
        { name: 'Students Db App', url: 'http://localhost:3000/' }
      ]}
      organization={{
        name: 'Learners',
        legalName: 'Learners Inc',
        url: 'http://localhost:3000/',
        logo: 'https://google.com/logo.jpg'
      }}
      blogPost={{  }}
      facebook={{ facebookAppId: 'abc123' }}
      twitter={{ twitterUser: '@learnsUse' }}
    />



function App() {
  var student = {"id":"er","User_Email":"sdfsdfsdfs@fdgd.sfd","first_name":"ssdfsdf"};
  const studentTab = (<StudentTab studentData={{student}}/>);
  student["User_Email"] = "jai balayya";

  //studentTab.updateStudent(student);
  return (
    <div className="App">
      <div className="Container" style={{display:"flex"}}>
        <div style={{width: "50%"}}>
          <StudentTab/>
        </div>
        <div className="Container" id="studentsDetails" style={{flexGrow:"1" }} >
          Student Profile Data
        </div>
      </div>
    </div>
  );
}

export default App;
