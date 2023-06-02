import React from 'react'
import "./category.scss"
import Button from '../../components/Category/Button'
import MostPopular from '../../components/homemostpoopular/MostPopular'
import {Cards} from "../../Cards"
export default function Category() {
  return (
    <>
        <div className="category_head">
            <div className='button_wrapper'>
            <Button>
              My Jobs
            </Button>
            <Button>
               My proposal/orders
            </Button>
            <Button>
               Number of following
            </Button>
            <Button>
               My srt
            </Button>
            <Button>
               loresdfsdf
            </Button>
            <Button>
               loresdfsdf
            </Button>
            <Button>
               loresdfsdf
            </Button>
            <Button>
               loresdfsdf
            </Button>
            <Button>
               loresdfsdf
            </Button>
            <Button>
               loresdfsdf
            </Button>
            <Button>
               loresdfsdf
            </Button>
            <Button>
               loresdfsdf
            </Button>
            <Button>
               loresdfsdf
            </Button>
            <Button>
               loresdfsdf
            </Button>
            <Button>
               loresdfsdf
            </Button>
            <Button>
               loresdfsdf
            </Button>
            <Button>
               loresdfsdf
            </Button>
            <Button>
               loresdfsdf
            </Button>
            <Button>
               loresdfsdf
            </Button>
            <Button>
               loresdfsdf
            </Button>

            </div>
        </div>
        <MostPopular title={"User Interested"} cards={Cards} number={8}/>
        <hr className='hr'></hr>
        <MostPopular title={"User Interested"} number={4} cards={Cards}/>
        <hr className='hr'></hr>
    </>
  )
}
