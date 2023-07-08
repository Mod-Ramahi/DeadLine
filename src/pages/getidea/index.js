import React from 'react'
import Head from '../../components/pagehead/Head'
import Ideas from '../../components/ideas/Ideas'
import HeadBg from '../homepage/headimages/HeadBg.png'
export default function GetIdea() {
  return (
    <>
        <Head backgroundImg={HeadBg}/>
        <Ideas />
    </>
  )
}
