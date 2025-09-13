import { getJobs } from '@/api/apiJobs'
import useFetch from '@/hooks/use-fetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import JobCard from '../components/job-card'
import { getCompanies } from '@/api/apiCompanies'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { State } from 'country-state-city'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
const JobListing = () => {
  const [searchQuery,setSearchQuery] = useState("");
  const [location,setLocation] = useState("");
  const [company_id,setCompanyId] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const { isLoaded } = useUser();

  const {fn:fnJobs,data:dataJobs,loading:loadingJobs} = useFetch(getJobs,{location,company_id,searchQuery});

  const {fn:fnCompanies,data:companies} = useFetch(getCompanies);


   useEffect( () => {
    if(isLoaded){
      fnCompanies()
    }
  },[isLoaded])

  useEffect( () => {
    if(isLoaded){
      fnJobs()
    }
  },[isLoaded,searchQuery,location,company_id])

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get('search-query');
    if(query) setSearchQuery(query);
  }

  const clearFilters = () => {
    setCompanyId("");
    setLocation("");
    setSearchQuery("");
  }

  if(!isLoaded){
    return <BarLoader className='mb-4' width={'100%'} color='#36d7b7'/>
  }

  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>Latest Jobs</h1>

      <form onSubmit={handleSearch} className='h-14 flex w-full gap-2 items-center mb-3'>
        <Input type='text' placeholder='Search Jobs by Title..' name='search-query' className='h-full flex-1 px-4 text-md'/>
        <Button type='submit' className='h-full sm:w-28' variant='blue'>Search</Button>
      </form>

      <div className='flex flex-col sm:flex-row gap-2'>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({name}) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={setCompanyId}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({name,id}) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant='destructive' className='sm:w-1/2' onClick={clearFilters}>Clear Filters</Button>
      </div>

      {loadingJobs && (<BarLoader className='mb-4' width={'100%'} color='#36d7b7'/>)}

      {loadingJobs === false && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {dataJobs?.length ? (
            dataJobs.map((job) => {
              return <JobCard key={job.id} job={job} savedInit={job?.saved?.length > 0}/>
            })
          ) : (
            <p className='text-center text-gray-500'>No jobs found</p>
          )}
          {/* Add pagination here using shadcn pagination */}
          {dataJobs && dataJobs.length > itemsPerPage && (
            <div className="col-span-full mt-8">
              <Pagination>
                <PaginationContent>
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious onClick={() => setPage(page - 1)} />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: Math.ceil(dataJobs.length / itemsPerPage) }, (_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink 
                        onClick={() => setPage(i + 1)}
                        isActive={page === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  {page < Math.ceil(dataJobs.length / itemsPerPage) && (
                    <PaginationItem>
                      <PaginationNext onClick={() => setPage(page + 1)} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}

        </div>
      )}
    </div>
  )
}

export default JobListing