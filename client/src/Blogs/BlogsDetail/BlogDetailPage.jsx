import React from 'react'
import PostBox from '../../Home/PostBox'
import Layout from '../../others/Layout'
import BlogDetail from './BlogDetail'

const BlogDetailPage = () => {

  return (
    <Layout active={'home'} >
      <BlogDetail/>
  </Layout>
  )
}

export default BlogDetailPage