
import React from 'react'
import '../App.css';
import Layout from '../others/Layout';
import BlogCards from './BlogCards';

function BlogPage() {

  return (
    <Layout active={'home'} >
      <BlogCards />
    </Layout>
  );
}

export default BlogPage;
