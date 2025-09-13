import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button.jsx'
import { Carousel, CarouselContent, CarouselItem } from '../components/ui/carousel.jsx'
import companies from '../data/companies.json'
import faqs from '../data/faq.json'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card.jsx'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion.jsx'
const LandingPage = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      
      
      <section className='text-center'>
        <h1 className='gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl leading-tight'>
          <span className='block'>Find Your Dream Job</span>
          <span className='flex items-center justify-center gap-2 mt-2'>
            and get 
            <img src="/logo.png" alt="Hirrd" className='h-14 sm:h-24 lg:h-32 mx-2' />
          </span>
        </h1>
        <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl max-w-3xl mx-auto leading-relaxed'>
          Explore thousands of job opportunities with all the information you need. It's your future. Come find it. Manage all your job application from start to finish.
        </p>
      </section>
      <div className='flex gap-6 justify-center'>
        <Link to='/jobs'>
          <Button variant='blue' size='xl'>Find Jobs</Button>
        </Link>
        <Link to='/my-jobs'>
          <Button size='xl' variant='secondary'>My Jobs</Button>
        </Link>
        <Link to='/post-job'>
          <Button size='xl' variant='destructive'>Post a Job</Button>
        </Link>
        <Link to='/saved-jobs'>
          <Button size='xl' variant='outline'>Saved Jobs</Button>
        </Link>
      </div>

      <Carousel
      plugins ={[Autoplay({delay:2000})]}
      className="w-full py-10"
    >
      <CarouselContent className='flex gap-5 sm:gap-20 items-center'>
        {companies.map((company) => (
          <CarouselItem key={company.id} className="basis-1/3 lg:basis-1/6">
            <img src={company.path} alt={company.name} className='h-9 sm:h-14 object-contain'/>
          </CarouselItem>
        ))}
      </CarouselContent>
        </Carousel>

      <img src="/banner.jpeg" className='w-full ' alt="" />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
  <Card className="w-full h-full p-6">
    <CardHeader>
      <CardTitle>For Job Seekers</CardTitle>
    </CardHeader>
    <CardContent>
      Search and apply for jobs that match your skills and interests. Create a profile, upload your resume, and let employers find you.
    </CardContent>
  </Card>

  <Card className="w-full h-full p-6">
    <CardHeader>
      <CardTitle>For Employers</CardTitle>
    </CardHeader>
    <CardContent>
      Post job openings, review applications, and connect with qualified candidates. Find the right talent to help your business grow.
    </CardContent>
  </Card>
</section>

    <Accordion type="single" collapsible>
      {faqs.map((faq,index) => (
        <AccordionItem key={index} value = {`item-${index+1}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
    </main>
  )
}

export default LandingPage