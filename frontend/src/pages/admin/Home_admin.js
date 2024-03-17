import React, { useEffect, useState } from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';
import { useAuthContext } from '../../hooks/useAuthContext';
import Spinner from 'react-bootstrap/Spinner';
import { LineChart, CartesianGrid, Line, XAxis, YAxis, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFlask} from '@fortawesome/free-solid-svg-icons'
import { useLogout } from '../../hooks/useLogout';

const Home = () => {
  const { user } = useAuthContext();
  const [counts, setCounts] = useState({ productsCount: 0, usersCount: 0 });
  const [loading, setLoading] = useState(true);

  /* /timer */
  const {logout} = useLogout()

  const [lastActiveTime, setLastActiveTime] = useState(new Date());

  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      const currentTime = new Date();
      const diffInMilliseconds = currentTime - lastActiveTime;
      if (diffInMilliseconds >= 60000) {
        logout();
      }
    }, 60000);

    return () => clearTimeout(logoutTimer);
  }, [lastActiveTime]);

  const handleInteraction = () => {
    setLastActiveTime(new Date());
  };
  /* /timer */

/* beta */
// Function to get abbreviated month name
const getMonthName = (monthIndex) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return months[monthIndex];
};

// Generate data for months up to the current month
const generateData = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Get current month index

  const data = [];
  for (let i = 0; i <= currentMonth; i++) {
    data.push({
      month: getMonthName(i),
      value: Math.floor(Math.random() * 100) + 1, // Generate random value
    });
  }
  return data;
};
/* /beta */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/endpoint/home/admin', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCounts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div onClick={handleInteraction}>
      <NavbarAdmin />
        {loading ? (
        <div className="home-admin-content">
          <Spinner animation="border" variant='danger' role="status" className='user-admin-spinner' />
        </div>
        ) : (
          <div className="home-admin-content">
            <div className="pie-charts">
              <div className="pie-charts-title">
                <h4>App data</h4>
              </div>
              <div className="pie-charts-body">
                <PieChart width={400} height={250}>
                <Pie dataKey="value" data={[{ name: 'Users', value: counts.usersCount }, { name: 'Products', value: counts.productsCount }]} cx={200} cy={100} outerRadius={80} fill="#8884d8" label>
                  <Cell fill="#FFBB28" />
                  <Cell fill="#0088FE" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
              </div>
            </div>
            <div className="line-charts">
              <div className="line-charts-title">
                <h4>Payment data</h4>
                <h4 className='beta'><FontAwesomeIcon icon={faFlask} bounce/>Beta</h4>
              </div>
              <div className="line-charts-body">
              <LineChart width={600} height={300} data={generateData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8"/>
              </LineChart>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Home;
