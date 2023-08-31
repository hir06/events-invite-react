import React, { useEffect, useState } from 'react';
import { getAllPartnersList, submitAvailabilityForEvents } from "../../service/eventsService";
import { eventsInvitation } from '../../types/eventsForPartners.types';
import Loader from '../Loader/Loader';
import './Home.scss';
import { findBestDatesForEvents } from '../../utils/eventsHelpers';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<eventsInvitation.partner[]>([]);
  const [result, setResult] = useState<string>()

  useEffect(() => {
    fetchData();
  }, []);

  const handleError = (e: any) => {
    // TODO: add this to the logger/ error dashboards like dataDog
    console.log(e)
  };

  const fetchData = async () => {
    try {
      const response = await getAllPartnersList();
      if (true) {
        // sortDataByAge(response)
        await setData(response as any);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }

  const findDatesForEvents = async () => {
    const datesForEvents = findBestDatesForEvents(data)
    try {
      setIsLoading(true)
      const response = await submitAvailabilityForEvents(datesForEvents)
      /* check on status since API returns 500 error code with response and status 200 */
      if (response !== undefined && response.status !== 200) {
        setResult('Error in submitting the dates for events')
      }
      else {
        setResult('Hurrayyy we have submitted the dates for events our organizers will get back to you soon with event details'+ "\uD83C\uDF89")
      }
    }
    catch (err) {
      handleError(err);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className='container'>
        {/* Render your data here */}
        {!result && data && data.map(item => (
          <div key={item.email}>
            {item.firstName} {item.lastName}
            {/* Render your item here */}
          </div>
        ))}
        {!isLoading && result && <div>{result}</div>}
      </div>
      <button onClick={findDatesForEvents}> Find the Dates For Events </button>
    </>
  );
}

export default Home;

