import React from 'react'
import './App.css';
import Layout from './others/Layout';
import Mainconts from './Home/mainconts';
import { useState } from 'react';

function Home() {
  const [showPostForm, setShowPostForm] = useState(false);

  return (
    <Layout active={'home'} showPostForm={setShowPostForm} setShowPostForm={setShowPostForm}>
      <Mainconts setShowPostForm={setShowPostForm} showPostForm={showPostForm}/>
    </Layout>
  );
}

export default Home;
