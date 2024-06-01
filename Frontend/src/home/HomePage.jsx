import React from 'react'
import HomeFooter from './HomeFooter'
import HomeNav from './HomeNav'
import HeroSection from './HeroSection'
import ViewProducts from './ViewProducts'
import { useSearch } from './SearchContext'
import SearchProducts from './SearchProducts'

const HomePage = () => {
  const { searchTerm } = useSearch();
  return (
    <div>
        {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

<HomeNav/>
<div className='mt-3' style={{minHeight:"90vh"}}>
   { searchTerm?<SearchProducts/>:<ViewProducts/>}
</div>

<HomeFooter/>
    </div>
  )
}

export default HomePage