import React from 'react'
import Head from '../../components/pagehead/Head'
import Filter from '../../components/Search/Filter'
import "./search.scss"
import HeadBg from '../homepage/headimages/HeadBg.png'
export default function Search() {
  return (
    <>
        <Head backgroundImg={HeadBg}/>
        <Filter />
    </>
  )
}
