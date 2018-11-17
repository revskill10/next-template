import AppLayout from 'containers/layout-router'
import dynamic from 'next/dynamic'
import Grid from 'pages/profile.grid'
import React, { Component } from "react";
import ReactDropzone from "react-dropzone";
import XLSX from 'xlsx';
class App extends Component {
  onDrop = (files) => {
    // POST to a test endpoint for demo purposes
    const f = files[0]
    //var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => { //evt = on_file_select event
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type:'binary'});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, {header:1});
        /* Update state */
        console.log("Data>>>"+data);
    };
    reader.readAsBinaryString(f);
  }

  render() {
    return (
      <div className="app">
        <ReactDropzone
          onDrop={this.onDrop}
        >
          Drop your best gator GIFs here!!
        </ReactDropzone>
      </div>
    );
  }
}
const Profile = () => {
  const UserTest = dynamic(import(/* webpackChunkName: 'user-info-card' */ 'components/auth/user-info'), { ssr: false })
  
  return (
    <AppLayout
      title={'Profile'}
      description='Simple things'
      meta={<meta property="og:title" content="FB post title" class={''} />}
    >
      <Grid 
        left={<div>Left</div>}
        middle={<UserTest />}
        right={<div>Right</div>} />
      <App />
    </AppLayout>
  )
}

export default Profile
